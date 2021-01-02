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
import { CreateEvent, UserHome, Login, PublicHome, SignUp } from './pages'
import { useUser } from './UserContext'

const PrivateRoute: React.FC<RouteProps> = ({ children, ...rest }) => {
  const { user, initialized } = useUser()
  const renderFunc = ({ location }: RouteComponentProps<any, StaticContext, unknown>) => {
    if (user) {
      return children
    }
    if (!initialized) {
      return <div>Loading page</div>
    }
    return (
      <Redirect
        to={{
          pathname: '/login',
          state: { from: location },
        }}
      />
    )
  }
  return <Route {...rest} render={renderFunc} />
}

export const App: React.FC = () => {
  const { user } = useUser()
  return (
    <BrowserRouter>
      <Nav />
      <Switch>
        <Route exact path="/">
          {user ? <UserHome /> : <PublicHome />}
        </Route>
        <Route path="/signup">{user ? <Redirect to="/" /> : <SignUp />}</Route>
        <Route path="/login">{user ? <Redirect to="/" /> : <Login />}</Route>
        <PrivateRoute path="/create">
          <CreateEvent />
        </PrivateRoute>
      </Switch>
    </BrowserRouter>
  )
}
