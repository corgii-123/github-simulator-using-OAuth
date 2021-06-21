import { useState, useEffect } from 'react'
import { useRouter } from 'next/router'
import { getAuthToken, getGithubUser } from '../utils/api/backendApi'
import runRedis from '../utils/redis'
import { serialize } from 'cookie'
import { Button, Result } from 'antd'


export default function Auth({ error, userInfo }) {
  const [time, setTime] = useState(3)
  const router = useRouter()

  useEffect(() => {
    if (time === 0) {
      router.push('/')
    }
    const timer = setTimeout(() => {
      setTime(time - 1)
    }, 1000)
    return () => {
      clearTimeout(timer)
    }
  }, [time, router])

  return (
    !!error
      ? <Result
          title={`发生错误：${error.error_description}，👉${error.error_uri}`}
          extra={
            <Button key="console" onClick={() => {router.push('/')}}>
                    跳转至首页
            </Button>
          }
        />
      : <Result
          status="success"
          title={`登录成功，正在跳转首页${time}s。。。`}
          subTitle={`${userInfo.login}-${userInfo.name}-${userInfo.location}`}
          extra={[
            <Button key="console" onClick={() => {router.push('/')}}>
              跳转至首页
            </Button>
          ]}
        />
  )
}

export async function getServerSideProps({ res, query: { code } }) {
  if (!code || typeof window !== 'undefined') return { props: {} }
  
  // 拿到token
  const data = await getAuthToken(code)
  let isError = false
  let userInfo = {}

  if (data.error) {
    isError = true
  } else {
    const { setData } = runRedis()
    const maxAge = 100 * 60
    // 只是为了了解整个过程就不加密了
    const sessionId = Date.now()

    // 设置数据库
    await setData(sessionId, data)

    // 调用api.github
    userInfo = await getGithubUser(data)

    res.setHeader('Set-Cookie', serialize('userInfo', sessionId, {
      expires: new Date(Date.now() + maxAge * 1000),
      maxAge,
      httpOnly: true
    }))
  }

  return {
    props: {
      error: isError ? data : false,
      userInfo
    }
  }
}
