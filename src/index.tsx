import 'date-fns'
import CssBaseline from '@material-ui/core/CssBaseline'
import { ThemeProvider } from '@material-ui/core/styles'
import { MuiPickersUtilsProvider } from '@material-ui/pickers'
import DateFnsUtils from '@date-io/date-fns'
import React from 'react'
import ReactDOM from 'react-dom'

import { App } from './App'
import reportWebVitals from './reportWebVitals'
import { theme } from './theme'
import { UserContextProvider } from './state'

ReactDOM.render(
  <ThemeProvider theme={theme}>
    <UserContextProvider>
      <MuiPickersUtilsProvider utils={DateFnsUtils}>
        <CssBaseline />
        <React.StrictMode>
          <App />
        </React.StrictMode>
      </MuiPickersUtilsProvider>
    </UserContextProvider>
  </ThemeProvider>,
  document.getElementById('root'),
)

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals()
