import React from 'react'
import {
  BrowserRouter,
  Redirect,
  Route,
  RouteComponentProps,
  RouteProps,
  Switch,
} from 'react-router-dom'
import { StaticContext } from 'react-router'

import { Nav } from './components'
import { CreateEvent, UserHome, Login, PublicHome, SignUp, Loading } from './pages'
import { useUser } from './UserContext'

interface PrivateRouteProps extends RouteProps {
  redirectTo?: string
}

const PrivateRoute: React.FC<PrivateRouteProps> = ({
  redirectTo = '/login',
  children,
  ...rest
}) => {
  const { user, initialized } = useUser()
  const renderFunc = ({ location }: RouteComponentProps<any, StaticContext, unknown>) => {
    if (user) {
      return children
    }
    if (!initialized) {
      return <Loading />
    }
    return (
      <Redirect
        to={{
          pathname: redirectTo,
          state: { from: location },
        }}
      />
    )
  }
  return <Route {...rest} render={renderFunc} />
}

export const App: React.FC = () => {
  const { user, initialized } = useUser()
  return (
    <BrowserRouter>
      <Nav />
      <Switch>
        <Route exact path="/">
          {user ? <UserHome /> : <PublicHome />}
        </Route>
        <Route path="/signup">
          {user ? <Redirect to="/" /> : initialized ? <SignUp /> : <Loading />}
        </Route>
        <Route path="/login">
          {user ? <Redirect to="/" /> : initialized ? <Login /> : <Loading />}
        </Route>
        <PrivateRoute path="/create">
          <CreateEvent />
        </PrivateRoute>
      </Switch>
    </BrowserRouter>
  )
}
