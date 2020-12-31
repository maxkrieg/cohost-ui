import React from 'react'
import { BrowserRouter, Route, Switch } from 'react-router-dom'
import { Home, PublicHome, SignUp, Login, CreateEvent } from './pages'
import { Nav } from './components'
import { useUser } from './UserContext'

export const App: React.FC = () => {
  const { user } = useUser()
  return (
    <BrowserRouter>
      <Nav />
      <Switch>
        <Route exact path="/">
          {user ? <Home /> : <PublicHome />}
        </Route>
        <Route path="/signup" component={SignUp} />
        <Route path="/login" component={Login} />
        <Route path="/create" component={CreateEvent} />
      </Switch>
    </BrowserRouter>
  )
}
