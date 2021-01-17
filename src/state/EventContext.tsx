import { createContext, useMemo, useState, useContext, Dispatch, SetStateAction } from 'react'

export interface IEvent {
  title: string
  description?: string
  startDate: Date | null
  endDate: Date | null
  placeId: string | null
  latLng: google.maps.LatLngLiteral | null
}

export type EventContextType = {
  event: IEvent
  setEvent: Dispatch<SetStateAction<IEvent>>
}

const defaultEvent: IEvent = {
  title: '',
  startDate: new Date(),
  endDate: new Date(),
  placeId: null,
  latLng: null,
}

const EventContext = createContext<EventContextType>({
  event: defaultEvent,
  setEvent: () => console.warn('no event provider'),
})

export const useEventContext = () => {
  const context = useContext(EventContext)
  if (!context) {
    throw new Error(`useEventContext must be used within a EventContextProvider`)
  }
  return context
}

export const EventContextProvider: React.FC = (props) => {
  const [event, setEvent] = useState<IEvent>(defaultEvent)
  const value = useMemo(
    () => ({
      event,
      setEvent,
    }),
    [event],
  )
  return <EventContext.Provider value={value} {...props} />
}
