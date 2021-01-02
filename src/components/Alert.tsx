import MuiAlert, { AlertProps } from '@material-ui/lab/Alert'
import React from 'react'

export const Alert: React.FC<AlertProps> = (props) => {
  return <MuiAlert elevation={6} variant="filled" {...props} />
}
