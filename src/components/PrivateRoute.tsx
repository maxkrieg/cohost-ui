import React from 'react'
import { StaticContext } from 'react-router'
import { Redirect, Route, RouteComponentProps, RouteProps } from 'react-router-dom'

import { Loading } from '../pages'
import { useUserContext } from '../state'

export interface PrivateRouteProps extends RouteProps {
  redirectTo?: string
}

export const PrivateRoute: React.FC<PrivateRouteProps> = ({
  redirectTo = '/login',
  children,
  ...rest
}) => {
  const { user, initialized } = useUserContext()
  const renderFunc = ({ location }: RouteComponentProps<any, StaticContext, unknown>) => {
    if (user) {
      return children
    }
    if (!initialized) {
      return <Loading />
    }
    return (
      <Redirect
        to={{
          pathname: redirectTo,
          state: { from: location },
        }}
      />
    )
  }
  return <Route {...rest} render={renderFunc} />
}
