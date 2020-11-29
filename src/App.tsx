import React from 'react'
import { BrowserRouter, Route, Switch } from 'react-router-dom'
import HomePage from './HomePage'
import SignUpPage from './SignUpPage'

const App: React.FC = () => (
  <BrowserRouter>
    <Switch>
      <Route path="/" exact component={HomePage} />
      <Route path="/signup" component={SignUpPage} />
    </Switch>
  </BrowserRouter>
)

export default App
