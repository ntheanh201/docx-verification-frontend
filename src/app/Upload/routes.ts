import { RouteType } from 'app/routes'

import { UploadScene } from './scenes/Upload/Upload'

export const uploadRoutes: RouteType[] = [
  {
    path: '/upload',
    secure: false,
    withNormalLayout: true,
    component: UploadScene
  }
]
