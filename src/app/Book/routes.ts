import { RouteType } from 'app/routes'

import { BookScene } from './scenes/Book/BookScene'

export const bookRoutes: RouteType[] = [
  {
    path: '/books',
    secure: false,
    withNormalLayout: true,
    component: BookScene
  },
  {
    path: '/book/:bookId',
    secure: false,
    withNormalLayout: true,
    component: BookScene
  }
]
