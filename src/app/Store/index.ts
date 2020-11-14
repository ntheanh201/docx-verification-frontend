import { configureStore } from 'redux-core'

import { loginSlice } from './Auth'
import { docSlice } from './Books'
import { pageSlice } from './Book'
import { audioSlice } from './Audio'
import { sliderSlice } from './Slider'

const reducer = {
  login: loginSlice.reducer,
  books: docSlice.reducer,
  book: pageSlice.reducer,
  audio: audioSlice.reducer,
  slider: sliderSlice.reducer
}

// const middleware = [...getDefaultMiddleware(), logger]

export default configureStore({
  reducer
})
