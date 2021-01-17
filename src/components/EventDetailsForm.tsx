import { Grid, TextField, Typography } from '@material-ui/core'
import { KeyboardDatePicker, KeyboardTimePicker } from '@material-ui/pickers'
import React from 'react'
import { useEventContext } from '../state'

import { LocationSearch } from './LocationSearch'
import { Map } from './Map'

export const EventDetailsForm: React.FC = () => {
  const { event, setEvent } = useEventContext()

  const handleTitleChange = (changeEvent: React.ChangeEvent<HTMLInputElement>) => {
    setEvent({ ...event, title: changeEvent.target.value })
  }
  const handleStartDateChange = (date: Date | null) => {
    setEvent({ ...event, startDate: date })
  }
  const handleEndDateChange = (date: Date | null) => {
    setEvent({ ...event, endDate: date })
  }
  const handleLocationChange = (location: {
    placeId: string | null
    latLng: google.maps.LatLngLiteral | null
  }) => {
    setEvent({ ...event, ...location })
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
            value={event.title}
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
            value={event.startDate}
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
            value={event.startDate}
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
            value={event.endDate}
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
            value={event.endDate}
            onChange={handleEndDateChange}
            KeyboardButtonProps={{
              'aria-label': 'change time',
            }}
          />
        </Grid>
        <Grid item xs={12}>
          <LocationSearch onLocationChange={handleLocationChange} />
          <div
            style={{
              width: '100%',
              height: `${event.latLng ? '300px' : '0px'}`,
              marginTop: '10px',
            }}
          >
            {event.latLng && <Map latLng={event.latLng} zoom={15} />}
          </div>
        </Grid>
      </Grid>
    </React.Fragment>
  )
}
