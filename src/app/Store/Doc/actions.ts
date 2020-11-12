import { docSlice } from './slice'

// const {  } = docSlice.actions

// export const loginActionCreator = ({
//   username,
//   password
// }) => async dispatch => {
//   try {
//     const authToken = await loginService.requestLogin(
//       username.trim().toLowerCase(),
//       password
//     )
//     if (authToken) {
//       const userData = await loginService.getUserAfterAuth(authToken?.access)
//       if (userData) {
//         await dispatch(login({ currentUser: userData, authToken }))
//         return 200
//       }
//     }
//     return 401
//   } catch (e) {
//     return console.error(e.message)
//   }
// }

export const setFileActionCreator = () => async dispatch => {
  try {
    // return await dispatch(logout())
  } catch (e) {
    return console.error(e.message)
  }
}
