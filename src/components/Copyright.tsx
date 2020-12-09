import React from 'react'
import Typography from '@material-ui/core/Typography'
import { Link as RouterLink } from 'react-router-dom'

export const Copyright: React.FC = () => {
  return (
    <Typography variant="body2" color="textSecondary" align="center">
      {'Copyright © '}
      <RouterLink to="/">Cohost </RouterLink>
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  )
}
