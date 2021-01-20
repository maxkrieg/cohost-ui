import { Grid, TextField, Typography } from '@material-ui/core'
import { KeyboardDatePicker, KeyboardTimePicker } from '@material-ui/pickers'
import React, { useState } from 'react'
import { useEventContext, EventActionTypes } from '../state'

import { LocationSearch } from './LocationSearch'
import { Map } from './Map'

export const EventDetailsForm: React.FC = () => {
  const { state, dispatch } = useEventContext()
  const [latLng, setLatLng] = useState<google.maps.LatLngLiteral | null>(null)

  const handleTitleChange = (changeEvent: React.ChangeEvent<HTMLInputElement>) => {
    dispatch({ type: EventActionTypes.UpdateTitle, payload: changeEvent.target.value })
  }
  const handleStartDateChange = (date: Date | null) => {
    dispatch({ type: EventActionTypes.UpdateStartDate, payload: date })
  }
  const handleEndDateChange = (date: Date | null) => {
    dispatch({ type: EventActionTypes.UpdateEndDate, payload: date })
  }

  const handleLocationChange = (location: {
    placeId: string | null
    latLng: google.maps.LatLngLiteral | null
  }) => {
    setLatLng(location.latLng)
    dispatch({ type: EventActionTypes.UpdatePlaceId, payload: location.placeId })
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
            value={state.title}
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
            value={state.startDate}
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
            value={state.startDate}
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
            value={state.endDate}
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
            value={state.endDate}
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
              height: `${latLng ? '300px' : '0px'}`,
              marginTop: '10px',
            }}
          >
            {latLng && <Map latLng={latLng} zoom={15} />}
          </div>
        </Grid>
      </Grid>
    </React.Fragment>
  )
}
