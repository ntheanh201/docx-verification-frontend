import { configureStore } from 'redux-core'

import { loginSlice } from './Auth'
import { docSlice } from './Doc'

const reducer = {
  login: loginSlice.reducer,
  books: docSlice.reducer
}

// const middleware = [...getDefaultMiddleware(), logger]

export default configureStore({
  reducer
})
