import { createSlice, PayloadAction } from 'redux-core'
import { BooksPaged, Book } from 'type'

interface BooksDetail extends BooksPaged {
  bookDetail: Book
  loadingMergeAudio: boolean
}

const initialState: BooksDetail = {
  books: null,
  current_page: 0,
  total_pages: null,
  page_size: null,
  bookDetail: null,
  loadingMergeAudio: false
}

export const docSlice = createSlice({
  name: 'books',
  initialState,
  reducers: {
    getAllBooks: (state, { payload }: PayloadAction<BooksPaged>) => {
      state.books = payload.books ? payload.books.sort((a, b) => b.created_at.localeCompare(a.created_at)) : payload.books
      state.current_page = payload.current_page
      state.total_pages = payload.total_pages
      state.page_size = payload.page_size
    },
    getBookInfo: (state, { payload }: PayloadAction<Book>) => {
      state.bookDetail = payload
    },
    uploadBook: (state, { payload }: PayloadAction<Book>) => {
      state.bookDetail = payload
    },
    deleteBook: (state, { payload }: PayloadAction<{ id: number }>) => {
      const index = state.books?.findIndex(book => book.id === payload.id)
      if (index !== -1) {
        state.books.splice(index, 1)
      }
    },
    acceptAudioDownload: (
      state,
      { payload }: PayloadAction<{ id: number }>
    ) => {
      const index = state.books?.findIndex(book => book.id === payload.id)
      state.books[index].acceptAudioDownload = true
    },
    mergeAudio: (
      state,
      { payload }: PayloadAction<{ id: number; audio_url: string }>
    ) => {
      const index = state.books?.findIndex(book => book.id === payload.id)
      state.books[index].audio_url = payload.audio_url
    },
    setLoadingMergeAudio: (state, { payload }: PayloadAction<boolean>) => {
      state.loadingMergeAudio = payload
    },
    appendBook(state, { payload }: PayloadAction<Book>) {
      state.books = [payload, ...state.books]
    }
  }
})

const { acceptAudioDownload, setLoadingMergeAudio } = docSlice.actions
export { acceptAudioDownload, setLoadingMergeAudio }
