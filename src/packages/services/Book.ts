import { axios } from 'http-backend'
import { Book } from 'type'

import BaseService from './Base'

class BookService extends BaseService<Book> {
  constructor() {
    super()
    this.baseURL += 'book'
  }

  //   getAllBooks(): Promise<Book[]> {
  //     return axios
  //       .get(this.baseURL)
  //       .then(res => res.data)
  //       .catch(err => {
  //         console.log(err)
  //         throw err
  //       })
  //   }

  getBookCount(): Promise<number> {
    return axios
      .get(this.baseURL + '/count')
      .then(res => res.data)
      .catch(err => {
        console.log(err)
        throw err
      })
  }

  uploadBook(): Promise<Book> {
    return axios
      .post(this.baseURL + '/upload')
      .then(res => res.data)
      .catch(err => {
        console.log(err)
        throw err
      })
  }
}

export const bookService = new BookService()
