import React, { useState, useCallback, useEffect, useRef } from 'react'

interface MapProps {
  latLng: google.maps.LatLngLiteral | null
  zoom?: number
}

const defaultLatLng: google.maps.LatLngLiteral = {
  lat: 40.7607793,
  lng: -111.8910474,
}

export const Map: React.FC<MapProps> = ({ latLng, zoom = 15 }) => {
  const [map, setMap] = useState<google.maps.Map>()
  const [marker, setMarker] = useState<google.maps.Marker>()
  const mapRef = useRef<HTMLDivElement>(null)

  const initMap = useCallback(() => {
    if (mapRef.current) {
      const newMap = new google.maps.Map(mapRef.current, {
        zoom,
        center: latLng || defaultLatLng,
        mapTypeId: google.maps.MapTypeId.ROADMAP,
        mapTypeControl: false,
        streetViewControl: false,
      })
      const newMarker = new google.maps.Marker({ map: newMap, draggable: false, clickable: false })
      setMap(newMap)
      setMarker(newMarker)
    }
  }, [setMap, setMarker, latLng, zoom])

  useEffect(() => {
    if (!map && window.google) {
      initMap()
    }
    if (!map || !marker) {
      return undefined
    }
    map.setCenter(latLng || defaultLatLng)
    marker.setPosition(latLng || defaultLatLng)
  }, [initMap, map, marker, latLng])

  return <div ref={mapRef} style={{ width: '100%', height: '100%' }} />
}
