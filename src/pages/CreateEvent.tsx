import React from 'react'
import { Redirect, RouteComponentProps } from 'react-router-dom'
import { useUser } from '../UserContext'

export const CreateEvent: React.FC<RouteComponentProps> = (props) => {
  const { user } = useUser()
  if (!user) {
    return <Redirect to="/login" />
  }
  return <div>Create Event</div>
}
