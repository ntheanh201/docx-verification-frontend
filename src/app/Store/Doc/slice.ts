import { createSlice, PayloadAction } from 'redux-core'
import { BooksPaged } from 'type'

const initialState: BooksPaged = {
  books: null,
  current_page: 0,
  total_pages: null,
  page_size: null
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
    }
  }
})
