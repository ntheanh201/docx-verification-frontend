export interface LoginState {
  authToken?: AuthToken
  currentUser?: User
}

export interface AuthToken {
  access_token: string
}
