import { RouteType } from 'app/routes'

import { VerifyScene } from './scenes/Verify/VerifyScene'

export const verifyRoutes: RouteType[] = [
  {
    path: '/verify',
    secure: false,
    withNormalLayout: true,
    component: VerifyScene
  }
]
