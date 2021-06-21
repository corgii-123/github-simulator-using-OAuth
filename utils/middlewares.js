import runRedis from './redis'

export const tokenMiddleware = (handler) => async (req, res) => {
  const { cookies } = req
  const { getData } = runRedis()
  const myToken = await getData(cookies.userInfo)

  // 在req上添加myToken字段中间件
  req.myToken = myToken

  return await handler(req, res)
}