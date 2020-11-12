import { configureStore } from 'redux-core'

import { loginSlice } from './Auth'

const reducer = {
  login: loginSlice.reducer
}

// const middleware = [...getDefaultMiddleware(), logger]

export default configureStore({
  reducer
})
