import Grid from '@material-ui/core/Grid'
import { makeStyles } from '@material-ui/core/styles'
import TextField from '@material-ui/core/TextField'
import Typography from '@material-ui/core/Typography'
import LocationOnIcon from '@material-ui/icons/LocationOn'
import Autocomplete from '@material-ui/lab/Autocomplete'
import parse from 'autosuggest-highlight/parse'
import throttle from 'lodash/throttle'
import React from 'react'

import { Map } from './Map'

let autocompleteService: google.maps.places.AutocompleteService | null = null
let geocoderService: google.maps.Geocoder | null = null

const useStyles = makeStyles((theme) => ({
  icon: {
    color: theme.palette.text.secondary,
    marginRight: theme.spacing(2),
  },
}))

export const LocationSearch = () => {
  const classes = useStyles()
  const [value, setValue] = React.useState<google.maps.places.AutocompletePrediction | null>(null)
  const [inputValue, setInputValue] = React.useState('')
  const [location, setLocation] = React.useState<google.maps.LatLngLiteral | null>(null)
  const [options, setOptions] = React.useState<google.maps.places.AutocompletePrediction[]>([])

  const fetch = React.useMemo(
    () =>
      throttle(
        (
          request: { input: string },
          callback: (
            result: google.maps.places.AutocompletePrediction[],
            status: google.maps.places.PlacesServiceStatus,
          ) => void,
        ) => {
          autocompleteService!.getPlacePredictions(request, callback)
        },
        200,
      ),
    [],
  )

  React.useEffect(() => {
    let active = true

    if (!autocompleteService && window.google) {
      autocompleteService = new window.google.maps.places.AutocompleteService()
    }
    if (!autocompleteService) {
      return undefined
    }

    if (inputValue === '') {
      setOptions(value ? [value] : [])
      return undefined
    }

    fetch({ input: inputValue }, (results) => {
      if (active) {
        let newOptions: google.maps.places.AutocompletePrediction[] = []

        if (value) {
          newOptions = [value]
        }

        if (results) {
          newOptions = [...newOptions, ...results]
        }

        setOptions(newOptions)
      }
    })

    return () => {
      active = false
    }
  }, [value, inputValue, fetch])

  React.useEffect(() => {
    if (!value) {
      setLocation(null)
      return
    }

    if (!geocoderService && window.google) {
      geocoderService = new window.google.maps.Geocoder()
    }
    if (!geocoderService) {
      return undefined
    }
    geocoderService.geocode({ placeId: value.place_id }, (geocoderResults) => {
      const { lat: getLat, lng: getLng } = geocoderResults[0].geometry.location
      setLocation({ lat: getLat(), lng: getLng() })
    })
  }, [value])

  return (
    <>
      <Autocomplete
        id="google-map-demo"
        getOptionLabel={(option) => (typeof option === 'string' ? option : option.description)}
        filterOptions={(x) => x}
        options={options}
        autoComplete
        includeInputInList
        filterSelectedOptions
        value={value}
        onChange={(event: any, newValue: google.maps.places.AutocompletePrediction | null) => {
          setOptions(newValue ? [newValue, ...options] : options)
          setValue(newValue)
        }}
        onInputChange={(event, newInputValue) => {
          setInputValue(newInputValue)
        }}
        renderInput={(params) => (
          <TextField {...params} label="Add a location" variant="outlined" fullWidth />
        )}
        renderOption={(option) => {
          const matches = option.structured_formatting.main_text_matched_substrings
          const parts = parse(
            option.structured_formatting.main_text,
            matches.map((match: any) => [match.offset, match.offset + match.length]),
          )
          return (
            <Grid container alignItems="center">
              <Grid item>
                <LocationOnIcon className={classes.icon} />
              </Grid>
              <Grid item xs>
                {parts.map((part, index) => (
                  <span key={index} style={{ fontWeight: part.highlight ? 700 : 400 }}>
                    {part.text}
                  </span>
                ))}
                <Typography variant="body2" color="textSecondary">
                  {option.structured_formatting.secondary_text}
                </Typography>
              </Grid>
            </Grid>
          )
        }}
      />
      <div
        style={{
          width: '100%',
          height: `${location ? '300px' : '0px'}`,
          marginTop: '10px',
        }}
      >
        {location && <Map location={location} zoom={15} />}
      </div>
    </>
  )
}
