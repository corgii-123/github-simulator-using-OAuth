import { tokenMiddleware } from '../../utils/middlewares'
import { getGithubUser } from '../../utils/api/backendApi'

async function handler(req, res) {
  if (req.myToken) {
    const userInfo = await getGithubUser(req.myToken)
    res.status(200).json(userInfo)
    return 
  }
  res.status(404).send({ errorMessage: '请登录' })
}

export default tokenMiddleware(handler)