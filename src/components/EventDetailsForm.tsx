import { Checkbox, FormControlLabel, Grid, TextField, Typography } from '@material-ui/core'
import { KeyboardDatePicker, KeyboardTimePicker } from '@material-ui/pickers'
import React from 'react'

import { placeIdToLatLng } from '../utils'
import { LocationSearch } from './LocationSearch'
import { Map } from './Map'

export const EventDetailsForm: React.FC = () => {
  const [title, setTitle] = React.useState('')
  const [startDate, setStartDate] = React.useState<Date | null>(new Date())
  const [endDate, setEndDate] = React.useState<Date | null>(new Date())
  const [googleMapsId, setGoogleMapsId] = React.useState<string | null>(null)
  const [location, setLocation] = React.useState<google.maps.LatLngLiteral | null>(null)
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
  const handleLocationChange = (placeId: string | null) => {
    setGoogleMapsId(placeId)
  }

  React.useEffect(() => {
    if (!googleMapsId) {
      setLocation(null)
      return
    }

    const getAndSetLatLng = async () => {
      const latLng = await placeIdToLatLng(googleMapsId)
      setLocation(latLng)
    }
    getAndSetLatLng()
  }, [googleMapsId])

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
          <LocationSearch onLocationChange={handleLocationChange} />
          <div
            style={{
              width: '100%',
              height: `${location ? '300px' : '0px'}`,
              marginTop: '10px',
            }}
          >
            {location && <Map location={location} zoom={15} />}
          </div>
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
