import { CircularProgress, Container, Grid } from '@material-ui/core'
import React from 'react'

export const Loading: React.FC = () => {
  return (
    <Container>
      <div style={{ height: '10vh' }} />
      <Grid container justify="center" alignItems="center">
        <CircularProgress size={100} thickness={10} />
      </Grid>
    </Container>
  )
}
