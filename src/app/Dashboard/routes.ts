import { RouteType } from 'app/routes'

import { UploadList } from './scenes/UploadList/UploadList'

export const dashboardRoutes: RouteType[] = [
  {
    path: '/',
    secure: false,
    withNormalLayout: true,
    component: UploadList
  }
]
