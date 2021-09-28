import React from 'react'
import {Redirect, Route} from 'react-router-dom'

interface Props {
  component: any
  rest?: any
}

const PrivateRoute = ({component: Component, ...rest}: Props) => {
  return (
    <Route
      {...rest}
      render={props => {
        if (localStorage.getItem('receipt')) {
          return <Component {...props} {...rest} />
        } else {
          return <Redirect to="/" />
        }
      }}
    />
  )
}

export default PrivateRoute
