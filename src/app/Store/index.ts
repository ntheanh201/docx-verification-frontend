import { configureStore } from 'redux-core'

import { loginSlice } from './Auth'
import { docSlice } from './Books'
import { pageSlice } from './Book'
import { audioSlice } from './Audio'

const reducer = {
  login: loginSlice.reducer,
  books: docSlice.reducer,
  book: pageSlice.reducer,
  audio: audioSlice.reducer
}

// const middleware = [...getDefaultMiddleware(), logger]

export default configureStore({
  reducer
})
