import { RouteType } from 'app/routes'

import { NotFoundPage } from './ErrorPage/NotFound'
import { Login } from './Login/Login'
import { Register } from './Register/Register'

export const authRoutes: RouteType[] = [
  {
    path: '/login',
    secure: false,
    withNormalLayout: true,
    component: Login
  },
  {
    path: '/register',
    secure: false,
    withNormalLayout: true,
    component: Register
  },
  {
    path: '/404',
    secure: false,
    withNormalLayout: false,
    component: NotFoundPage
  }
]
