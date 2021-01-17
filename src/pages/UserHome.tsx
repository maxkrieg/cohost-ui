import Container from '@material-ui/core/Container'
import React from 'react'
import { Link as RouterLink } from 'react-router-dom'

import { useUserContext } from '../state'

export const UserHome: React.FC = () => {
  const { user } = useUserContext()

  return (
    <Container component="main" maxWidth="lg">
      User Home {user!.firstName}
      <RouterLink to="/create">Create event page</RouterLink>
    </Container>
  )
}
