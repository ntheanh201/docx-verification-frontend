import { axios } from 'http'
import { ImageFormData, User } from 'type'

import BaseService from './Base'

class UserService extends BaseService<User> {
  constructor() {
    super()
    this.baseURL += 'auth/users/me/'
  }

  getAllUsers(): Promise<User[]> {
    return axios
      .get(this.baseURL.slice(0, -3))
      .then(res => res.data)
      .catch(err => {
        console.log(err)
        throw err
      })
  }

  getUserById(id: number): Promise<User> {
    return axios
      .get(this.baseURL.slice(0, -3) + `${id}/`)
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

  updateAvatar(avatar: ImageFormData): Promise<User> {
    const data = new FormData()
    //@ts-ignore
    data.append('avatar', avatar)
    return axios
      .patch(this.baseURL, data, {
        headers: { 'Content-Type': 'multipart/form-data' }
      })
      .then(res => res.data)
      .catch(() => null)
  }

  updateCover(cover: ImageFormData): Promise<User> {
    const data = new FormData()
    //@ts-ignore
    data.append('cover', cover)
    return axios
      .patch(this.baseURL, data, {
        headers: { 'Content-Type': 'multipart/form-data' }
      })
      .then(res => res.data)
      .catch(() => null)
  }
}

export const userService = new UserService()
