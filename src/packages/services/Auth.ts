import { axios } from 'http-backend'
import { AuthToken, User } from 'type'

import BaseService from './Base'

class LoginService extends BaseService<AuthToken> {
  constructor() {
    super()
    this.baseURL += 'auth/login'
  }

  requestLogin(username: string, password: string): Promise<AuthToken> {
    return axios
      .post(this.baseURL, { username: username, password: password })
      .then(async res => {
        await localStorage.setItem('authToken', JSON.stringify(res.data))
        axios.defaults.headers.Authorization = `Bearer ${res.data.access_token}`
        return res.data
      })
      .catch(err => {
        console.log('ERR ON SIGN IN', err)
        return null
      })
  }
}

class RegisterService extends BaseService<User> {
  constructor() {
    super()
    this.baseURL += 'auth/register'
  }
}

export const loginService = new LoginService()
export const registerService = new RegisterService()
