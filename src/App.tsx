import React from 'react';
import { Route, RouteComponentProps, Switch } from 'react-router-dom';
import Breadcrumbs from './components/Breadcrumbs/Breadcrumbs';
import Footer from './components/Footer/Footer';
import Header from './components/Header/Header';
import ProductPage from './components/Products/ProductPage';
import ProductsContainer from './components/Products/ProductsContainer';
import FeaturedBanner from './components/StoreFront/FeaturedBanner';
import StoreFrontContainer from './components/StoreFront/StoreFrontContainer';

const App = () => {
  return (
    <>
      <Header />

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

      <Footer />
    </>
  );
};

export default App;
