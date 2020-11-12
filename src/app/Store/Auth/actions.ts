import { loginSlice } from './slice'
import { loginService, registerService } from 'service'

const { login, logout } = loginSlice.actions

export const loginActionCreator = ({
  username,
  password
}) => async dispatch => {
  try {
    const authToken = await loginService.requestLogin(
      username.trim().toLowerCase(),
      password
    )
    if (authToken) {
      await dispatch(login({ currentUser: { username }, authToken }))
      return 200
    }
    return 401
  } catch (e) {
    return 400
  }
}

export const logoutActionCreator = () => async dispatch => {
  try {
    return await dispatch(logout())
  } catch (e) {
    return console.error(e.message)
  }
}
