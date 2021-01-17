import React, { useCallback, useEffect, useState } from 'react'
import { BrowserRouter, Redirect, Route, Switch } from 'react-router-dom'

import { Nav } from './components'
import { CreateEvent, UserHome, Login, PublicHome, SignUp, Loading } from './pages'
import { PrivateRoute } from './components'
import { EventContextProvider, useUserContext } from './state'
import { loadGoogleMapsScript } from './utils'

export const App: React.FC = () => {
  const { user, initialized } = useUserContext()
  const [mapsScriptLoaded, setMapsScriptLoaded] = useState(false)

  const handleMapsScriptLoad = useCallback(() => {
    setMapsScriptLoaded(true)
  }, [setMapsScriptLoaded])

  useEffect(() => {
    const script = loadGoogleMapsScript()
    script.addEventListener('load', handleMapsScriptLoad)
    return () => {
      script.removeEventListener('load', handleMapsScriptLoad)
    }
  }, [mapsScriptLoaded, handleMapsScriptLoad])

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
          <EventContextProvider>
            <CreateEvent />
          </EventContextProvider>
        </PrivateRoute>
      </Switch>
    </BrowserRouter>
  )
}
