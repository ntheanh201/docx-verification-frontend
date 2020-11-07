import { RouteType } from 'app/routes'

import { NotFoundPage } from './ErrorPage/NotFound'
import { Login } from './Login/Login'

export const authRoutes: RouteType[] = [
  {
    path: '/login',
    secure: false,
    withNormalLayout: true,
    component: Login
  },
  {
    path: '/404',
    secure: false,
    withNormalLayout: false,
    component: NotFoundPage
  }
]
