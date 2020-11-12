import { User } from './users'

export interface LoginState {
  authToken?: AuthToken
  currentUser?: User
}

export interface AuthToken {
  refresh: string
  access: string
}
