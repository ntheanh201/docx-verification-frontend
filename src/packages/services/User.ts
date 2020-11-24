import { axios } from 'http-backend'
import { User } from 'type'

import BaseService from './Base'
import { message } from 'antd'

class UserService extends BaseService<User> {
  private searchBaseURL: string

  constructor() {
    super()
    this.searchBaseURL = this.baseURL + 'users'
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

  search(name: string): Promise<User[]> {
    return axios
      .post(this.searchBaseURL + '/search', { name: name })
      .then(res => res.data)
      .catch(err => {
        message.error(err.toString())
        return []
      })
  }
}

export const userService = new UserService()
