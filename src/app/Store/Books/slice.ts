import { createSlice, PayloadAction } from 'redux-core'
import { BooksPaged, Book } from 'type'

interface BooksDetail extends BooksPaged {
  bookDetail: Book
}

const initialState: BooksDetail = {
  books: null,
  current_page: 0,
  total_pages: null,
  page_size: null,
  bookDetail: null
}

export const docSlice = createSlice({
  name: 'books',
  initialState,
  reducers: {
    getAllBooks: (state, { payload }: PayloadAction<BooksPaged>) => {
      state.books = payload.books
      state.current_page = payload.current_page
      state.total_pages = payload.total_pages
      state.page_size = payload.page_size
    },
    getBookInfo: (state, { payload }: PayloadAction<Book>) => {
      state.bookDetail = payload
    }
  }
})
