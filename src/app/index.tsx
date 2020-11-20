import { React, ReactDOM, useEffect } from 'core'

import { withNormalLayout } from 'layout'
import { ToastContainer } from 'ui'
import { Provider, useDispatch } from 'redux-core'
import { BrowserRouter as Router, Switch, Redirect, Route } from 'router'

import { PublicRoute, SecureRoute } from './Auth/Route'

import { publicRoutes, secureRoutes } from './routes'
import Store from './Store'
import { getVoicesActionCreator } from './Store/Audio'

const Root = () => {

  return (
    <Provider store={Store}>
      <ToastContainer />
      <MainWrapper>
        <Router>
          <Switch>
            {publicRoutes.map((route, i) => (
              <PublicRoute
                key={i}
                path={route.path}
                exact={true}
                component={
                  route.withNormalLayout
                    ? withNormalLayout(route.component)
                    : route.component
                }
              />
            ))}
            {secureRoutes.map((route, i) => (
              <SecureRoute
                key={i}
                path={route.path}
                exact={true}
                component={
                  route.withNormalLayout
                    ? withNormalLayout(route.component)
                    : route.component
                }
                secure
              />
            ))}
            <Route key='no-match' component={() => <Redirect to='/404' />} />
          </Switch>
        </Router>
      </MainWrapper>
    </Provider>
  )
}

function MainWrapper({ children, ...props }) {
  const dispatch = useDispatch()
  useEffect(() => {
    dispatch(getVoicesActionCreator())
  }, [])
  return React.cloneElement(children, props)
}

ReactDOM.render(<Root />, document.getElementById('root'))
