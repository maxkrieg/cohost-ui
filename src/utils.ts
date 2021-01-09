const GOOGLE_MAPS_API_KEY = process.env.REACT_APP_GOOGLE_MAPS_API_KEY

let autocompleteService: google.maps.places.AutocompleteService | null = null
let geocoderService: google.maps.Geocoder | null = null

export const isValidEmailAddress = (email: string) => {
  const re = /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/
  return re.test(String(email).toLowerCase())
}

export const loadGoogleMapsScript = () => {
  const scriptId = 'google-maps'
  const scriptSrc = `https://maps.googleapis.com/maps/api/js?key=${GOOGLE_MAPS_API_KEY}&libraries=places`
  return loadScript(scriptSrc, scriptId)
}

export const loadScript = (src: string, id: string) => {
  const scriptOnPage = document.querySelector(`#${id}`)
  if (scriptOnPage) {
    return scriptOnPage
  }
  const script = document.createElement('script')
  script.setAttribute('async', '')
  script.setAttribute('id', id)
  script.src = src
  window.document.body.appendChild(script)
  return script
}

export const getAutocompleteService = () => {
  if (!autocompleteService && window.google) {
    autocompleteService = new window.google.maps.places.AutocompleteService()
  }

  return autocompleteService
}

export const getGeoCoderService = () => {
  if (!geocoderService && window.google) {
    geocoderService = new window.google.maps.Geocoder()
  }

  return geocoderService
}

export const placeIdToLatLng = (placeId: string): Promise<google.maps.LatLngLiteral> => {
  return new Promise((resolve, reject) => {
    getGeoCoderService()!.geocode({ placeId }, (results, status) => {
      if (status === 'OK') {
        const { location } = results[0].geometry
        resolve({ lat: location.lat(), lng: location.lng() })
      } else {
        reject(status)
      }
    })
  })
}
