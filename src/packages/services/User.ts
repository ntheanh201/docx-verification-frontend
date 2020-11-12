import { axios } from 'http-backend'
import { User } from 'type'

import BaseService from './Base'

class UserService extends BaseService<User> {
  constructor() {
    super()
    this.baseURL += 'profile'
  }

  getAllUsers(): Promise<User[]> {
    return axios
      .get(this.baseURL)
      .then(res => res.data)
      .catch(err => {
        console.log(err)
        throw err
      })
  }

  getUserById(id: number): Promise<User> {
    return axios
      .get(this.baseURL + `${id}/`)
      .then(res => res.data)
      .catch(err => {
        console.log(err)
        throw err
      })
  }

  updateCurrentUser(data: User): Promise<User> {
    return axios
      .put(this.baseURL, data)
      .then(res => res.data)
      .catch(err => {
        console.log(err)
        throw err
      })
  }
}

export const userService = new UserService()
