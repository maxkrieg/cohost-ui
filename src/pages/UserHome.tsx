import Container from '@material-ui/core/Container'
import React from 'react'
import { Link as RouterLink } from 'react-router-dom'

import { useUser } from '../UserContext'

export const UserHome: React.FC = () => {
  const { user } = useUser()

  return (
    <Container component="main" maxWidth="lg">
      User Home {user!.firstName}
      <RouterLink to="/create">Create event page</RouterLink>
    </Container>
  )
}