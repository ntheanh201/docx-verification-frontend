import { React } from 'core'
import { Route as ReactRouterRoute, Redirect } from 'router'
// import { useSelector } from 'redux-core'

export const SecureRoute = (props: any) => {
  return (
    <AuthenticationLayer>
      <ReactRouterRoute {...props} />
    </AuthenticationLayer>
  )
}

const AuthenticationLayer = (props: any) => {
  // const { currentUser } = useSelector(state => state.login)
  const currentUser = false
  return currentUser ? props.children : <Redirect to='/login' />
}
