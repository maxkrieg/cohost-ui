import React from 'react'

interface MapProps {
  location: google.maps.LatLngLiteral | null
  zoom?: number
}

const defaultLocation: google.maps.LatLngLiteral = {
  lat: 40.7607793,
  lng: -111.8910474,
}

export const Map: React.FC<MapProps> = ({ location, zoom = 15 }) => {
  const [map, setMap] = React.useState<google.maps.Map>()
  const [marker, setMarker] = React.useState<google.maps.Marker>()
  const mapRef = React.useRef<HTMLDivElement>(null)

  const initMap = React.useCallback(() => {
    if (mapRef.current) {
      const newMap = new google.maps.Map(mapRef.current, {
        zoom,
        center: location || defaultLocation,
        mapTypeId: google.maps.MapTypeId.ROADMAP,
        mapTypeControl: false,
        streetViewControl: false,
      })
      const newMarker = new google.maps.Marker({ map: newMap, draggable: false, clickable: false })
      setMap(newMap)
      setMarker(newMarker)
    }
  }, [setMap, setMarker, location, zoom])

  React.useEffect(() => {
    if (!map && window.google) {
      initMap()
    }
    if (!map || !marker) {
      return undefined
    }
    map.setCenter(location || defaultLocation)
    marker.setPosition(location || defaultLocation)
  }, [initMap, map, marker, location])

  return <div ref={mapRef} style={{ width: '100%', height: '100%' }} />
}
