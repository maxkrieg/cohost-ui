import React, { useState, ChangeEvent } from 'react'
import Avatar from '@material-ui/core/Avatar'
import Button from '@material-ui/core/Button'
import TextField from '@material-ui/core/TextField'
import Link from '@material-ui/core/Link'
import Grid from '@material-ui/core/Grid'
import Box from '@material-ui/core/Box'
import LockOutlinedIcon from '@material-ui/icons/LockOutlined'
import Typography from '@material-ui/core/Typography'
import { makeStyles } from '@material-ui/core/styles'
import Container from '@material-ui/core/Container'
import { post } from './api'
import { RouteComponentProps } from 'react-router-dom'
import Snackbar from '@material-ui/core/Snackbar'
import IconButton from '@material-ui/core/IconButton'
import CloseIcon from '@material-ui/icons/Close'
import MuiAlert, { AlertProps } from '@material-ui/lab/Alert'

const isValidEmailAddress = (email: string) => {
  const re = /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/
  return re.test(String(email).toLowerCase())
}

const Alert: React.FC<AlertProps> = (props) => {
  return <MuiAlert elevation={6} variant="filled" {...props} />
}

const Copyright: React.FC = () => {
  return (
    <Typography variant="body2" color="textSecondary" align="center">
      {'Copyright © '}
      <Link color="inherit" href="/">
        Cohost
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  )
}

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

enum FieldNames {
  FirstName = 'firstName',
  LastName = 'lastName',
  Email = 'email',
  Password = 'password',
  PasswordConfirm = 'passwordConfirm',
}

interface FormData {
  [FieldNames.FirstName]: string
  [FieldNames.LastName]: string
  [FieldNames.Email]: string
  [FieldNames.Password]: string
  [FieldNames.PasswordConfirm]: string
}

const SignUpPage: React.FC<RouteComponentProps> = (props) => {
  const defaultFormData: FormData = {
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    passwordConfirm: '',
  }
  const classes = useStyles()
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
    if (name === FieldNames.Email) {
      setEmailErrorMessage('')
    }
    if (name === FieldNames.Password || name === FieldNames.PasswordConfirm) {
      setPasswordErrorMessage('')
    }
  }

  const validateFormData = () => {
    const allHaveValues = Object.values(formData).every((value: string) => value.length > 0)
    if (!allHaveValues) {
      setSnackbarErrorMessage('Please ensure all required fields (marked with *) are filled in')
      throw new Error('Fields missing values')
    }

    if (!isValidEmailAddress(formData.email)) {
      setEmailErrorMessage('Please enter a valid email address.')
      throw new Error('Invalid email address')
    }

    if (formData.password !== formData.passwordConfirm) {
      setPasswordErrorMessage('Passwords must match.')
      throw new Error('Passwords do not match')
    }
  }

  const handleSubmit = async () => {
    try {
      validateFormData()
    } catch (e) {
      console.error('Error validating form data', e)
      return
    }

    const payload: Partial<FormData> = { ...formData }
    delete payload.passwordConfirm

    try {
      await post('/signup', payload)
      setFormData(defaultFormData)
      props.history.push('/')
    } catch (e) {
      setSnackbarErrorMessage(e.message)
      const errorMessages = e.response?.data?.errors
      if (errorMessages) {
        Object.entries<[string]>(errorMessages).forEach(([field, errorsArray]) => {
          if (field === FieldNames.Email) {
            setEmailErrorMessage(errorsArray.join(','))
          }
          if (field === FieldNames.Password) {
            setPasswordErrorMessage(errorsArray.join(','))
          }
        })
      }
    }
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
                autoComplete={FieldNames.FirstName}
                name={FieldNames.FirstName}
                variant="outlined"
                required
                fullWidth
                id={FieldNames.FirstName}
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
                id={FieldNames.LastName}
                label="Last Name"
                name={FieldNames.LastName}
                autoComplete={FieldNames.LastName}
                value={formData.lastName}
                onChange={handleChange}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                required
                fullWidth
                id={FieldNames.Email}
                label="Email Address"
                name={FieldNames.Email}
                autoComplete={FieldNames.Email}
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
                name={FieldNames.Password}
                label="Password"
                type={FieldNames.Password}
                id={FieldNames.Password}
                autoComplete={FieldNames.Password}
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
                name={FieldNames.PasswordConfirm}
                label="Confirm Password"
                type={FieldNames.Password}
                id={FieldNames.PasswordConfirm}
                autoComplete={FieldNames.PasswordConfirm}
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
          <Grid container justify="flex-end">
            <Grid item>
              <Link href="#" variant="body2">
                Already have an account? Sign in
              </Link>
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

export default SignUpPage
