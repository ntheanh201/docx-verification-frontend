import { createSlice, PayloadAction } from 'redux-core'
import { LoginState, User } from 'type'

const initialUserData = localStorage.getItem('userData')
  ? JSON.parse(localStorage.getItem('userData'))
  : null

const initialAuthToken = localStorage.getItem('authToken')
  ? JSON.parse(localStorage.getItem('authToken'))
  : null

const logginInitialState: LoginState = {
  currentUser: initialUserData,
  authToken: initialAuthToken
}

export const loginSlice = createSlice({
  name: 'login',
  initialState: logginInitialState,
  reducers: {
    login: (
      state,
      {
        payload
      }: PayloadAction<{
        currentUser: User
        authToken: { access_token: string }
      }>
    ) => {
      localStorage.setItem('userData', JSON.stringify(payload.currentUser))
      localStorage.setItem('authToken', JSON.stringify(payload.authToken))
      state.authToken = payload.authToken
      state.currentUser = payload.currentUser
    },
    logout: state => {
      localStorage.removeItem('userData')
      localStorage.removeItem('authToken')
      state.authToken = null
      state.currentUser = null
    }
  }
})

const { logout } = loginSlice.actions
export { logout }
