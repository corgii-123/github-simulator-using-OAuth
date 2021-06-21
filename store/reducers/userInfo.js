import { INIT_USER_INFO } from '../contrasts'

const initialState = {
  userInfo: {}
}

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case INIT_USER_INFO:
      const userInfo = action.payload
      return {
        userInfo
      }
    default:
      return state
  }
}

export default reducer