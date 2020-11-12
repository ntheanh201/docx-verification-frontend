import { React } from 'core'
import { Route as ReactRouterRoute, Redirect } from 'router'
import { useSelector } from 'redux-core'
import { getCurrentUser } from 'Store'

export const SecureRoute = (props: any) => {
  return (
    <AuthenticationLayer>
      <ReactRouterRoute {...props} />
    </AuthenticationLayer>
  )
}

const AuthenticationLayer = (props: any) => {
  const { currentUser } = useSelector(getCurrentUser)

  return currentUser ? props.children : <Redirect to='/login' />
}
