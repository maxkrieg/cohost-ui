import Grid from '@material-ui/core/Grid'
import { makeStyles } from '@material-ui/core/styles'
import TextField from '@material-ui/core/TextField'
import Typography from '@material-ui/core/Typography'
import LocationOnIcon from '@material-ui/icons/LocationOn'
import Autocomplete from '@material-ui/lab/Autocomplete'
import parse from 'autosuggest-highlight/parse'
import throttle from 'lodash/throttle'
import React, { useEffect, useMemo, useState } from 'react'

import { getAutocompleteService, placeIdToLatLng } from '../utils'

type GoogleLatLngLiteral = google.maps.LatLngLiteral
type GoogleAutoCompletePrediction = google.maps.places.AutocompletePrediction

const useStyles = makeStyles((theme) => ({
  icon: {
    color: theme.palette.text.secondary,
    marginRight: theme.spacing(2),
  },
}))

interface LocationSearchProps {
  onLocationChange?: (location: {
    placeId: string | null
    latLng: GoogleLatLngLiteral | null
  }) => void
}

export const LocationSearch: React.FC<LocationSearchProps> = ({ onLocationChange = () => {} }) => {
  const autocompleteService = getAutocompleteService()
  const classes = useStyles()
  const [value, setValue] = useState<GoogleAutoCompletePrediction | null>(null)
  const [inputValue, setInputValue] = useState('')
  const [options, setOptions] = useState<GoogleAutoCompletePrediction[]>([])

  const fetch = useMemo(
    () =>
      throttle(
        (
          request: { input: string },
          callback: (
            result: GoogleAutoCompletePrediction[],
            status: google.maps.places.PlacesServiceStatus,
          ) => void,
        ) => {
          autocompleteService!.getPlacePredictions(request, callback)
        },
        200,
      ),
    [autocompleteService],
  )

  useEffect(() => {
    let active = true

    if (inputValue === '') {
      setOptions(value ? [value] : [])
      return undefined
    }

    fetch({ input: inputValue }, (results) => {
      if (active) {
        let newOptions: GoogleAutoCompletePrediction[] = []

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

  const handleChange = async (
    event: React.ChangeEvent<{}>,
    newValue: GoogleAutoCompletePrediction | null,
  ) => {
    setOptions(newValue ? [newValue, ...options] : options)
    setValue(newValue)
    if (newValue) {
      const latLng = await placeIdToLatLng(newValue.place_id)
      onLocationChange({ placeId: newValue.place_id, latLng })
    } else {
      onLocationChange({ placeId: null, latLng: null })
    }
  }

  const handleInputChange = (event: React.ChangeEvent<{}>, newInputValue: string) => {
    setInputValue(newInputValue)
  }

  return (
    <Autocomplete
      id="google-map-demo"
      getOptionLabel={(option) => (typeof option === 'string' ? option : option.description)}
      filterOptions={(x) => x}
      options={options}
      autoComplete
      includeInputInList
      filterSelectedOptions
      value={value}
      onChange={handleChange}
      onInputChange={handleInputChange}
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
  )
}
