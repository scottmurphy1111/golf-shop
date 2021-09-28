import React from 'react'
import {Redirect, Route} from 'react-router-dom'

const PrivateRoute = ({component: Component, ...rest}) => {
  return (
    <Route
      {...rest}
      render={props => {
        if (localStorage.getItem('cart-id')) {
          return <Component {...props} {...rest} />
        } else {
          return <Redirect to="/" />
        }
      }}
    />
  )
}

export default PrivateRoute
