import {ApolloProvider} from '@apollo/client'
import React from 'react'
import {Route, RouteComponentProps, Switch} from 'react-router-dom'

import CheckoutContainer from './components/Checkout/CheckoutContainer'
import Footer from './components/Footer/Footer'
import Header from './components/Header/Header'
import ProductPage from './components/Products/ProductPage'
import ProductsContainer from './components/Products/ProductsContainer'
import StoreFrontContainer from './components/StoreFront/StoreFrontContainer'
import {client} from './utils/ApolloClient'
import PrivateRoute from './utils/PrivateRoute'
const App = () => {
  return (
    <ApolloProvider client={client}>
      <Header />
      <Switch>
        <Route
          exact
          path="/"
          component={(props: RouteComponentProps) => (
            <StoreFrontContainer {...props} />
          )}
        />
        <Route
          exact
          path="/products"
          component={(props: RouteComponentProps) => (
            <ProductsContainer {...props} />
          )}
        />
        <Route
          exact
          path="/product/:id"
          component={(props: RouteComponentProps) => <ProductPage {...props} />}
        />
        <PrivateRoute
          exact
          path={'/checkout'}
          component={props => <CheckoutContainer {...props} />}
        />
      </Switch>
      <Footer />
    </ApolloProvider>
  )
}

export default App
