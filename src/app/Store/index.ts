import { configureStore } from 'redux-core'

import { loginSlice } from './Auth'
import { docSlice } from './Doc'
import { pageSlice } from './Page'

const reducer = {
  login: loginSlice.reducer,
  books: docSlice.reducer,
  book: pageSlice.reducer
}

// const middleware = [...getDefaultMiddleware(), logger]

export default configureStore({
  reducer
})
