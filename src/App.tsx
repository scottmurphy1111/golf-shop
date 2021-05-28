import React from 'react';
import { Route, RouteComponentProps, Switch } from 'react-router-dom';
import ProductPage from './components/Products/ProductPage';
import ProductsContainer from './components/Products/ProductsContainer';
import StoreFrontContainer from './components/StoreFront/StoreFrontContainer';

const App = () => {
  return (
    <>
      <Switch>
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
        <Route
          exact
          path="/"
          component={(props: RouteComponentProps) => (
            <StoreFrontContainer {...props} />
          )}
        />
      </Switch>
    </>
  );
};

export default App;
