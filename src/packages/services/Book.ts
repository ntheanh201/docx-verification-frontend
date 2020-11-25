import { axios } from 'http-backend'
import { Book, BookFilter, BookSorter, BooksPaged } from 'type'

import BaseService from './Base'

class BookService extends BaseService<Book> {
  constructor() {
    super()
    this.baseURL += 'books'
  }

  getAllBooks(
    currentPage: number = 0,
    filters: BookFilter,
    sorter: BookSorter
  ): Promise<BooksPaged> {
    return axios
      .post(this.baseURL, {
        page: currentPage,
        filters,
        sorter
      })
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

  uploadBook(file: any, voice_id: string): Promise<Book> {
    const data = new FormData()
    data.append('file', file)
    data.append('default_voice', voice_id)
    return axios
      .post(this.baseURL + '/upload', data, {
        headers: { 'Content-Type': 'multipart/form-data' }
      })
      .then(res => res.data)
      .catch(err => {
        console.log(err)
        throw err
      })
  }

  downloadBook(savedName: string): Promise<any> {
    return axios
      .get(this.baseURL + `/download/${savedName}`)
      .then(res => res.data)
      .catch(err => {
        console.log(err)
        throw err
      })
  }

  async mergeAudio(bookId): Promise<any> {
    return axios
      .post(this.baseURL + '/merge_audio', {
        book_id: bookId
      })
      .then(res => res.data)
      .catch(err => {
        console.log(err)
        throw err.response.data
      })
  }

  async compressAudio(bookId): Promise<any> {
    return axios
      .post(this.baseURL + '/compress_audio', {
        book_id: bookId
      })
      .then(res => res.data)
      .catch(err => {
        console.log(err)
        throw err.response.data
      })
  }

  async cloneBook(book_id: number, voice_id: string): Promise<Book> {
    return axios
      .post(this.baseURL + '/clone', {
        book_id,
        voice_id
      })
      .then(res => res.data)
      .catch(err => {
        console.log(err)
        throw err
      })
  }
}

export const bookService = new BookService()
