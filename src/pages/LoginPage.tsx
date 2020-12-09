import Avatar from '@material-ui/core/Avatar'
import Box from '@material-ui/core/Box'
import Button from '@material-ui/core/Button'
import Container from '@material-ui/core/Container'
import Grid from '@material-ui/core/Grid'
import IconButton from '@material-ui/core/IconButton'
import Snackbar from '@material-ui/core/Snackbar'
import { makeStyles } from '@material-ui/core/styles'
import TextField from '@material-ui/core/TextField'
import Typography from '@material-ui/core/Typography'
import CloseIcon from '@material-ui/icons/Close'
import LockOutlinedIcon from '@material-ui/icons/LockOutlined'
import React, { ChangeEvent, useState } from 'react'
import { Link as RouterLink, RouteComponentProps } from 'react-router-dom'

import { post } from '../api'
import { Alert, Copyright } from '../components'
import { UserFieldNames } from '../constants'
import { isValidEmailAddress } from '../utils'

const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(8),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(3),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}))

export const LoginPage: React.FC<RouteComponentProps> = (props) => {
  const classes = useStyles()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [snackbarErrorMessage, setSnackbarErrorMessage] = useState('')

  const handleCloseErrorDialog = (event?: React.SyntheticEvent, reason?: string) => {
    if (reason === 'clickaway') {
      return
    }
    setSnackbarErrorMessage('')
  }

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    if (name === UserFieldNames.Email) {
      setEmail(value)
    }
    if (name === UserFieldNames.Password) {
      setPassword(value)
    }
  }

  const validateFormData = () => {
    if (!isValidEmailAddress(email)) {
      throw new Error('Please enter a valid email address')
    }

    if (!password) {
      throw new Error('Please enter a password')
    }
  }

  const handleSubmit = async () => {
    try {
      validateFormData()
    } catch (e) {
      return setSnackbarErrorMessage(e.message)
    }

    try {
      await post('/auth/login', { email, password })
      setEmail('')
      setPassword('')
      props.history.push('/')
    } catch (e) {
      console.error(e)
      setSnackbarErrorMessage(e.message)
      setEmail('')
      setPassword('')
    }
  }

  return (
    <Container component="main" maxWidth="xs">
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Login
        </Typography>
        <form className={classes.form} noValidate>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                required
                autoFocus
                fullWidth
                id={UserFieldNames.Email}
                label="Email Address"
                name={UserFieldNames.Email}
                autoComplete={UserFieldNames.Email}
                value={email}
                onChange={handleChange}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                required
                fullWidth
                name={UserFieldNames.Password}
                label="Password"
                type={UserFieldNames.Password}
                id={UserFieldNames.Password}
                autoComplete={UserFieldNames.Password}
                value={password}
                onChange={handleChange}
              />
            </Grid>
          </Grid>
          <Button
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
            onClick={handleSubmit}
          >
            Login
          </Button>
          <Grid container justify="center">
            <Grid item>
              <RouterLink to="/signup">Don't have an account? Click here to sign up</RouterLink>
            </Grid>
          </Grid>
        </form>
      </div>
      <Box mt={5}>
        <Copyright />
      </Box>
      <Snackbar
        anchorOrigin={{
          vertical: 'top',
          horizontal: 'center',
        }}
        key="topcenter"
        open={!!snackbarErrorMessage}
        autoHideDuration={5000}
        onClose={handleCloseErrorDialog}
        action={
          <React.Fragment>
            <IconButton
              size="small"
              aria-label="close"
              color="inherit"
              onClick={handleCloseErrorDialog}
            >
              <CloseIcon fontSize="small" />
            </IconButton>
          </React.Fragment>
        }
      >
        <Alert severity="error" onClose={handleCloseErrorDialog}>
          {snackbarErrorMessage}
        </Alert>
      </Snackbar>
    </Container>
  )
}
