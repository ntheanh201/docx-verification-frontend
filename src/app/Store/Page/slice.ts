import { createSlice, PayloadAction } from 'redux-core'
import { Page } from 'type'

const initialState: Page = {
  voice_id: null,
  reviewer: null,
  status: null,
  audio_url: null,
  uploader: null,
  task_id: null,
  text_norm: null,
  text_raw: null,
  page_num: 1,
  book_id: null,
  id: null
}

export const pageSlice = createSlice({
  name: 'book',
  initialState,
  reducers: {
    getPageInfo: (state, { payload }: PayloadAction<Page>) => {
      console.log(payload)
      state.text_raw = payload.text_raw
      state.text_norm = payload.text_norm
      state = payload
    },
    editNormText: (state, { payload }: PayloadAction<string>) => {
      state.text_norm = payload
    },
    verifyNormText: (state, { payload }: PayloadAction<string>) => {
      state.status = 'verified'
    },
    genAudio: (state, { payload }: PayloadAction<string>) => {
      state.audio_url = payload
    }
  }
})
