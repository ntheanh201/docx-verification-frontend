import { docSlice } from './slice'

import { bookService } from 'service'
import { Book } from 'type'

const { getAllBooks, getBookInfo, uploadBook } = docSlice.actions

// export const loginActionCreator = ({
//   username,
//   password
// }) => async dispatch => {
//   try {
//     const authToken = await loginService.requestLogin(
//       username.trim().toLowerCase(),
//       password
//     )
//     if (authToken) {
//       const userData = await loginService.getUserAfterAuth(authToken?.access)
//       if (userData) {
//         await dispatch(login({ currentUser: userData, authToken }))
//         return 200
//       }
//     }
//     return 401
//   } catch (e) {
//     return console.error(e.message)
//   }
// }

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
    await dispatch(getBookInfo(data))
    return data as Book
  } catch (e) {
    return console.error(e.message)
  }
}
