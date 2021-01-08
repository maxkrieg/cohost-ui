const GOOGLE_MAPS_API_KEY = process.env.REACT_APP_GOOGLE_MAPS_API_KEY

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
