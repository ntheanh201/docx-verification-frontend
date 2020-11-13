import { axios } from 'http-backend'
import config from 'environment'

export default class BaseService<T> {
  protected baseURL = ''

  constructor() {
    const authToken = localStorage.getItem('authToken')
      ? JSON.parse(localStorage.getItem('authToken'))
      : null
    if (authToken) {
      axios.defaults.headers.Authorization = `Bearer ${authToken.access_token}`
    }
    this.baseURL = config.serverUrl
  }

  getAll(): Promise<T[]> {
    return axios
      .get(this.baseURL)
      .then(res => res.data)
      .catch(() => {
        window.location.href = '/logout'
      })
  }

  getById(id: number): Promise<T> {
    return axios
      .get(this.baseURL + `/${id}`)
      .then(res => res.data)
      .catch(err => console.log(err))
  }

  add(item: T): Promise<T> {
    return axios
      .post(this.baseURL, item)
      .then(res => res.data)
      .catch(() => {
        return null
      })
  }

  update(item: T): Promise<T> {
    return axios
      .patch(this.baseURL, item)
      .then(res => res.data)
      .catch(() => {
        return null
      })
  }

  delete(id: number): Promise<string> {
    return axios
      .delete(this.baseURL + `/${id}`)
      .then(res => {
        console.log(res.status)
        return 'success'
      })
      .catch(() => null)
  }
}
