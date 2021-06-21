import { INIT_USER_INFO } from "./contrasts"

export const initUserInfo = (userInfo) => {
  return {
    type: INIT_USER_INFO,
    payload: userInfo
  }
}