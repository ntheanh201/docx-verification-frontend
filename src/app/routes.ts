import { React } from 'core'

import { authRoutes } from './Auth/routes'
import { dashboardRoutes } from './Dashboard/routes'
import { uploadRoutes } from './Upload/routes'
import { verifyRoutes } from './Verify/routes'

export interface RouteType {
  path: string
  secure: boolean
  withNormalLayout?: boolean
  component: React.FC | React.Component
}

export const publicRoutes = [...authRoutes]

export const secureRoutes = [
  ...uploadRoutes,
  ...dashboardRoutes,
  ...verifyRoutes
]
