import React from 'react'
import { BrowserRouter, Route, Switch } from 'react-router-dom'
import { HomePage, SignUpPage, LoginPage } from './pages'

export const App: React.FC = () => (
  <BrowserRouter>
    <Switch>
      <Route path="/" exact component={HomePage} />
      <Route path="/signup" component={SignUpPage} />
      <Route path="/login" component={LoginPage} />
    </Switch>
  </BrowserRouter>
)
