import { createSlice, PayloadAction } from 'redux-core'
import { Book } from 'type'

interface FileState {
  file: any
  book: Book
}

const initialState: FileState = {
  file: null,
  book: null
}

export const docSlice = createSlice({
  name: 'doc',
  initialState,
  reducers: {
    uploadFile: (state, { payload }: PayloadAction<any>) => {
      state.file = payload
    }
  }
})
