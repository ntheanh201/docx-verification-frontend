import { createSlice, PayloadAction } from 'redux-core'
import { Page } from 'type'

interface BookInfo {
  book: Page
}

const initialState: BookInfo = {
  book: null
}

export const pageSlice = createSlice({
  name: 'book',
  initialState,
  reducers: {
    getPageInfo: (state, { payload }: PayloadAction<Page>) => {
      state.book = payload
    },
    editNormText: (state, { payload }: PayloadAction<string>) => {
      state.book.text_norm = payload
    },
    verifyNormText: (state, { payload }: PayloadAction<Page>) => {
      state.book = payload
    },
    genAudio: (state, { payload }: PayloadAction<{ status: string }>) => {
      // state.book.status = payload.status
    }
  }
})
