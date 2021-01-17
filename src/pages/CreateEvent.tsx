import React, { useState } from 'react'
import { makeStyles } from '@material-ui/core/styles'
import Paper from '@material-ui/core/Paper'
import Stepper from '@material-ui/core/Stepper'
import Step from '@material-ui/core/Step'
import StepLabel from '@material-ui/core/StepLabel'
import Button from '@material-ui/core/Button'
import Typography from '@material-ui/core/Typography'
import { EventAdditionalDetailsForm, EventDetailsForm, EventItemsForm } from '../components'
import { useEventContext } from '../state'

import { Copyright } from '../components'
import { createEvent } from '../api'

const useStyles = makeStyles((theme) => ({
  appBar: {
    position: 'relative',
  },
  layout: {
    width: 'auto',
    marginLeft: theme.spacing(2),
    marginRight: theme.spacing(2),
    [theme.breakpoints.up(600 + theme.spacing(2) * 2)]: {
      width: 800,
      marginLeft: 'auto',
      marginRight: 'auto',
    },
  },
  paper: {
    marginTop: theme.spacing(3),
    marginBottom: theme.spacing(3),
    padding: theme.spacing(2),
    [theme.breakpoints.up(600 + theme.spacing(3) * 2)]: {
      marginTop: theme.spacing(6),
      marginBottom: theme.spacing(6),
      padding: theme.spacing(3),
    },
  },
  stepper: {
    padding: theme.spacing(3, 0, 5),
  },
  buttons: {
    display: 'flex',
    justifyContent: 'flex-end',
  },
  button: {
    marginTop: theme.spacing(3),
    marginLeft: theme.spacing(1),
  },
}))

const steps = ['Event Details', 'Event Items', 'Additional Details']

// Event Details: title, start and end times, location
// Event Items: Add provided and requested items (food, games, etc)
// Additional Details: Description, cover photo

function getStepContent(step: number) {
  switch (step) {
    case 0:
      return <EventDetailsForm />
    case 1:
      return <EventItemsForm />
    case 2:
      return <EventAdditionalDetailsForm />
    default:
      throw new Error('Unknown step')
  }
}

export const CreateEvent = () => {
  const classes = useStyles()
  const [activeStep, setActiveStep] = useState(0)
  const { event } = useEventContext()

  const handleNext = () => {
    setActiveStep(activeStep + 1)
  }

  const handleSubmit = async () => {
    try {
      await createEvent(event!)
    } catch (e) {
      console.error(e)
    }
  }

  const handleBack = () => {
    setActiveStep(activeStep - 1)
  }

  const isFirstStep = activeStep === 0
  const isLastStep = activeStep === steps.length - 1

  return (
    <React.Fragment>
      <main className={classes.layout}>
        <Paper className={classes.paper}>
          <Typography component="h1" variant="h4" align="center">
            Create Event
          </Typography>
          <Stepper activeStep={activeStep} className={classes.stepper}>
            {steps.map((label) => (
              <Step key={label}>
                <StepLabel>{label}</StepLabel>
              </Step>
            ))}
          </Stepper>
          <React.Fragment>
            {getStepContent(activeStep)}
            <div className={classes.buttons}>
              {!isFirstStep && (
                <Button onClick={handleBack} className={classes.button}>
                  Back
                </Button>
              )}
              <Button
                variant="contained"
                color="primary"
                onClick={isLastStep ? handleSubmit : handleNext}
                className={classes.button}
              >
                {isLastStep ? 'Create' : 'Next'}
              </Button>
            </div>
          </React.Fragment>
        </Paper>
        <Copyright />
      </main>
    </React.Fragment>
  )
}
