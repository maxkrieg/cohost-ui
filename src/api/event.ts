import { post } from './utils'
import { IEvent } from '../state'

export const createEvent = async (event: IEvent) => {
  try {
    const response = await post('/api/events', event)
    return response.data
  } catch (e) {
    console.error('Error creating event', e)
    throw e
  }
}
