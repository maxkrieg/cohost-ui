import Container from '@material-ui/core/Container'
import React from 'react'
import { useUser } from '../UserContext'

export const Home: React.FC = () => {
  const { user } = useUser()

  return (
    <Container component="main" maxWidth="lg">
      User Home {user!.firstName}
    </Container>
  )
}
