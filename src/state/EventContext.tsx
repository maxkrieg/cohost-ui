import { createContext, useContext, Dispatch, useReducer } from 'react'

export interface IEvent {
  title: string
  description?: string
  startDate: Date | null
  endDate: Date | null
  placeId: string | null
}

export type EventContextType = {
  state: IEvent
  dispatch: Dispatch<any>
}

const defaultEvent: IEvent = {
  title: '',
  startDate: new Date(),
  endDate: new Date(),
  placeId: null,
}

const EventContext = createContext<EventContextType>({
  state: defaultEvent,
  dispatch: () => console.warn('no event provider'),
})

export const useEventContext = () => {
  const context = useContext(EventContext)
  if (!context) {
    throw new Error(`useEventContext must be used within a EventContextProvider`)
  }
  return context
}

export enum EventActionTypes {
  UpdateTitle = 'UPDATE_TITLE',
  UpdateStartDate = 'UPDATE_START_DATE',
  UpdateEndDate = 'UPDATE_END_DATE',
  UpdatePlaceId = 'UPDATE_PLACE_ID',
}

type EventAction =
  | { type: EventActionTypes.UpdateTitle; payload: string }
  | { type: EventActionTypes.UpdateStartDate; payload: Date | null }
  | { type: EventActionTypes.UpdateEndDate; payload: Date | null }
  | { type: EventActionTypes.UpdatePlaceId; payload: string }

const eventReducer = (state: IEvent, action: EventAction): IEvent => {
  switch (action.type) {
    case EventActionTypes.UpdateTitle:
      return { ...state, title: action.payload }
    case EventActionTypes.UpdateStartDate:
      return { ...state, startDate: action.payload }
    case EventActionTypes.UpdateEndDate:
      return { ...state, endDate: action.payload }
    case EventActionTypes.UpdatePlaceId:
      return { ...state, placeId: action.payload }
    default:
      throw new Error('error updating event')
  }
}

export const EventContextProvider: React.FC = (props) => {
  const [state, dispatch] = useReducer(eventReducer, defaultEvent)
  return <EventContext.Provider value={{ state, dispatch }} {...props} />
}
