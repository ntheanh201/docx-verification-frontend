import { docSlice } from './slice'

import { bookService } from 'service'
import { Book } from 'type'

const { getAllBooks, getBookInfo, uploadBook, deleteBook } = docSlice.actions

export const getAllBooksActionCreator = (
  currentPage: number
) => async dispatch => {
  try {
    const booksPaged = await bookService.getAllBooks(currentPage)
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
    return console.error(e.message)
  }
}

export const uploadBookActionCreator = (book: any) => async dispatch => {
  try {
    const data = await bookService.uploadBook(book)
    await dispatch(uploadBook(data))
    return data as Book
  } catch (e) {
    return console.error(e.message)
  }
}

export const deleteBookActionCreator = (bookId: number) => async dispatch => {
  try {
    await bookService.delete(bookId)
    await dispatch(deleteBook({ id: bookId }))
  } catch (e) {
    return console.error(e.message)
  }
}
