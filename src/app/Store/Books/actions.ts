import { docSlice } from './slice'

import { bookService } from 'service'
import { Book, BookFilter, BookSorter } from 'type'
import { message } from 'antd'

const {
  getAllBooks,
  getBookInfo,
  uploadBook,
  deleteBook,
  mergeAudio,
  compressAudio,
  appendBook
} = docSlice.actions

export const getAllBooksActionCreator = (
  currentPage: number,
  filters: BookFilter,
  sorter: BookSorter
) => async dispatch => {
  try {
    const booksPaged = await bookService.getAllBooks(
      currentPage,
      filters,
      sorter
    )
    await dispatch(getAllBooks(booksPaged))
  } catch (e) {
    return console.error(e.message)
  }
}

export const getBookInfoActionCreator = (bookId: number) => async dispatch => {
  try {
    const data = await bookService.getBookInfo(bookId)
    await dispatch(getBookInfo(data))
  } catch (e) {
    message.error(e.message)
    return console.error(e.message)
  }
}

export const uploadBookActionCreator = (
  book: any,
  defaultVoice: string
) => async dispatch => {
  try {
    const data = await bookService.uploadBook(book, defaultVoice)
    await dispatch(uploadBook(data))
    await dispatch(appendBook(data))
    message.success('Upload thành công !')
    return data as Book
  } catch (e) {
    message.error(e.message)
    console.error(e)
    return null
  }
}

export const cloneBookActionCreator = (
  book_id: number,
  defaultVoice: string
) => async dispatch => {
  try {
    const data = await bookService.cloneBook(book_id, defaultVoice)
    await dispatch(appendBook(data))
    message.success('Clone thành công')
    return data as Book
  } catch (e) {
    message.error(e.message)
    console.error(e)
    return null
  }
}

export const deleteBookActionCreator = (bookId: number) => async dispatch => {
  try {
    await bookService.delete(bookId)
    await dispatch(deleteBook({ id: bookId }))
    message.success(`Xóa thành công !`)
  } catch (e) {
    message.error(e.message)
    console.error(e)
    return null
  }
}

export const mergeAudioActionCreator = (bookId: number) => async dispatch => {
  try {
    const { audio_url } = await bookService.mergeAudio(bookId)
    await dispatch(mergeAudio({ id: bookId, audio_url }))
    message.success('Merge audio thành công')
    return audio_url
  } catch (e) {
    message.error(e.message)
    return null
  }
}

export const compressAudioActionCreator = (
  bookId: number
) => async dispatch => {
  try {
    const { audio_url } = await bookService.compressAudio(bookId)
    await dispatch(compressAudio({ id: bookId, compressed_url: audio_url }))
    message.success('Compress audio thành công')
    return audio_url
  } catch (e) {
    message.error(e.message)
    return null
  }
}
