import React from 'react'
import { Typography, Grid, TextField, FormControlLabel, Checkbox } from '@material-ui/core'
import { KeyboardTimePicker, KeyboardDatePicker } from '@material-ui/pickers'
import { LocationSearch } from './LocationSearch'

// Event Details: title, start and end times, location

export const EventDetailsForm: React.FC = () => {
  const [title, setTitle] = React.useState('')
  const [startDate, setStartDate] = React.useState<Date | null>(new Date())
  const [endDate, setEndDate] = React.useState<Date | null>(new Date())
  const [privateBoxChecked, setPrivateBoxChecked] = React.useState(false)

  const handleTitleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setTitle(event.target.value)
  }
  const handleStartDateChange = (date: Date | null) => {
    setStartDate(date)
  }
  const handleEndDateChange = (date: Date | null) => {
    setEndDate(date)
  }
  const handlePrivateBoxChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setPrivateBoxChecked(event.target.checked)
  }

  return (
    <React.Fragment>
      <Typography variant="h6" gutterBottom>
        Event Details
      </Typography>
      <Grid container spacing={3}>
        <Grid item xs={12}>
          <TextField
            required
            id="eventTitle"
            label="Event title"
            fullWidth
            autoComplete="event-title"
            value={title}
            onChange={handleTitleChange}
          />
        </Grid>
        <Grid item xs={12} md={6}>
          <KeyboardDatePicker
            disableToolbar
            variant="inline"
            format="MM/dd/yyyy"
            margin="normal"
            id="start-date"
            label="Start Date"
            value={startDate}
            onChange={handleStartDateChange}
            KeyboardButtonProps={{
              'aria-label': 'change date',
            }}
          />
        </Grid>
        <Grid item xs={12} md={6}>
          <KeyboardTimePicker
            margin="normal"
            id="start-time"
            label="Start time"
            value={startDate}
            onChange={handleStartDateChange}
            KeyboardButtonProps={{
              'aria-label': 'change time',
            }}
          />
        </Grid>
        <Grid item xs={12} md={6}>
          <KeyboardDatePicker
            disableToolbar
            variant="inline"
            format="MM/dd/yyyy"
            margin="normal"
            id="end-date"
            label="End Date"
            value={endDate}
            onChange={handleEndDateChange}
            KeyboardButtonProps={{
              'aria-label': 'change date',
            }}
          />
        </Grid>
        <Grid item xs={12} md={6}>
          <KeyboardTimePicker
            margin="normal"
            id="end-time"
            label="End time"
            value={endDate}
            onChange={handleEndDateChange}
            KeyboardButtonProps={{
              'aria-label': 'change time',
            }}
          />
        </Grid>
        <Grid item xs={12}>
          {/* <TextField id="location" label="Location" fullWidth autoComplete="location" /> */}
          <LocationSearch />
        </Grid>
        <Grid item xs={12}>
          <FormControlLabel
            control={
              <Checkbox
                checked={privateBoxChecked}
                onChange={handlePrivateBoxChange}
                color="secondary"
                name="makePrivate"
                value="yes"
              />
            }
            label="Make this a private event (only invited friends can view)"
          />
        </Grid>
      </Grid>
    </React.Fragment>
  )
}
