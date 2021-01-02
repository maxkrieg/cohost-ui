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

import { loginUser, signUpUser } from '../api'
import { UserFieldNames } from '../constants'
import { User } from '../interfaces'
import { isValidEmailAddress } from '../utils'
import { Alert, Copyright } from '../components'
import { useUser } from '../UserContext'
import { AxiosError } from 'axios'

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

export const SignUp: React.FC<RouteComponentProps> = (props) => {
  const defaultFormData: Partial<User> = {
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    passwordConfirm: '',
  }
  const classes = useStyles()
  const { setUser } = useUser()
  const [formData, setFormData] = useState(defaultFormData)
  const [snackbarErrorMessage, setSnackbarErrorMessage] = useState('')
  const [emailErrorMessage, setEmailErrorMessage] = useState('')
  const [passwordErrorMessage, setPasswordErrorMessage] = useState('')

  const handleCloseErrorDialog = (event?: React.SyntheticEvent, reason?: string) => {
    if (reason === 'clickaway') {
      return
    }
    setSnackbarErrorMessage('')
  }

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData({
      ...formData,
      [name]: value,
    })
    if (name === UserFieldNames.Email) {
      setEmailErrorMessage('')
    }
    if (name === UserFieldNames.Password || name === UserFieldNames.PasswordConfirm) {
      setPasswordErrorMessage('')
    }
  }

  const validateFormData = () => {
    const allHaveValues = Object.values(formData).every((value) => !!value)
    if (!allHaveValues) {
      setSnackbarErrorMessage('Please ensure all required fields (marked with *) are filled in')
      throw new Error('Fields missing values')
    }

    if (!isValidEmailAddress(formData.email!)) {
      setEmailErrorMessage('Please enter a valid email address.')
      throw new Error('Invalid email address')
    }

    if (formData.password !== formData.passwordConfirm) {
      setPasswordErrorMessage('Passwords must match.')
      throw new Error('Passwords do not match')
    }
  }

  const handleSignUpError = (e: AxiosError) => {
    setSnackbarErrorMessage(e.message)
    const errorMessages = e.response?.data?.errors
    if (errorMessages) {
      Object.entries<[string]>(errorMessages).forEach(([field, errorsArray]) => {
        if (field === UserFieldNames.Email) {
          setEmailErrorMessage(errorsArray.join(','))
        }
        if (field === UserFieldNames.Password) {
          setPasswordErrorMessage(errorsArray.join(','))
        }
      })
    }
  }

  const handleSubmit = async () => {
    try {
      validateFormData()
    } catch (e) {
      console.error('Error validating form data', e)
      return
    }

    const userPayload: Partial<User> = { ...formData }
    delete userPayload.passwordConfirm

    let user: User
    try {
      user = await signUpUser(userPayload)
    } catch (e) {
      return handleSignUpError(e)
    }

    const { email, password } = formData
    loginUser(email!, password!)
    setUser(user)
    props.history.push('/')
  }

  return (
    <Container component="main" maxWidth="xs">
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Sign up
        </Typography>
        <form className={classes.form} noValidate>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
              <TextField
                autoComplete={UserFieldNames.FirstName}
                name={UserFieldNames.FirstName}
                variant="outlined"
                required
                fullWidth
                id={UserFieldNames.FirstName}
                label="First Name"
                autoFocus
                value={formData.firstName}
                onChange={handleChange}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                variant="outlined"
                required
                fullWidth
                id={UserFieldNames.LastName}
                label="Last Name"
                name={UserFieldNames.LastName}
                autoComplete={UserFieldNames.LastName}
                value={formData.lastName}
                onChange={handleChange}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                required
                fullWidth
                id={UserFieldNames.Email}
                label="Email Address"
                name={UserFieldNames.Email}
                autoComplete={UserFieldNames.Email}
                value={formData.email}
                onChange={handleChange}
                error={!!emailErrorMessage}
                helperText={emailErrorMessage}
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
                value={formData.password}
                onChange={handleChange}
                error={!!passwordErrorMessage}
                helperText={passwordErrorMessage}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                required
                fullWidth
                name={UserFieldNames.PasswordConfirm}
                label="Confirm Password"
                type={UserFieldNames.Password}
                id={UserFieldNames.PasswordConfirm}
                autoComplete={UserFieldNames.PasswordConfirm}
                value={formData.passwordConfirm}
                onChange={handleChange}
                error={!!passwordErrorMessage}
                helperText={passwordErrorMessage}
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
            Sign Up
          </Button>
          <Grid container justify="center">
            <Grid item>
              <RouterLink to="/login">Already have an account? Click here to login</RouterLink>
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
