import { axios } from 'http-backend'
import { Book, BooksPaged } from 'type'

import BaseService from './Base'

class BookService extends BaseService<Book> {
  constructor() {
    super()
    this.baseURL += 'books'
  }

  getAllBooks(currentPage: number = 0): Promise<BooksPaged> {
    return axios
      .get(this.baseURL + `?page=${currentPage}`)
      .then(res => res.data)
      .catch(err => {
        console.log(err)
        throw err
      })
  }

  getBookInfo(bookdId: number): Promise<Book> {
    return axios
      .get(this.baseURL + `/${bookdId}`)
      .then(res => res.data)
      .catch(err => {
        console.log(err)
        throw err
      })
  }

  uploadBook(): Promise<Book> {
    // const data = new FormData()
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
