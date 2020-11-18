import { createSlice, PayloadAction } from 'redux-core'
import { Page } from 'type'

interface BookInfo {
  book: Page
  acceptAudioDownload: boolean
}

const initialState: BookInfo = {
  book: null,
  acceptAudioDownload: false
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
    },
    clearAudioURL: state => {
      state.book = { ...state.book, audio_url: '' }
    }
  }
})
