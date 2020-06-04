import './index.scss';
import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

import { PrivateRoute, PublicRoute } from './components/Routing';
import PageLayout from './components/PageLayout';
import Home from './pages/Home';
import Login from './pages/Login';
import Content from './pages/Content';
import SingleContentItem from './pages/SingleContentItem';

import { getFavorites, saveFavorites } from './modules/favorites';

function App() {
  const [favoriteItems, setFavoriteItems] = useState(getFavorites());
  useEffect(() => {
    saveFavorites(favoriteItems);
    console.log('favorites saved to local storage');
  }, [favoriteItems]);
  return (
    <Router>
      <PageLayout>
        <Switch>
          <PublicRoute path="/login">
            <Login />
          </PublicRoute>
          <PrivateRoute exact path="/content">
            <Content favorites={favoriteItems} setFavorites={setFavoriteItems} />
          </PrivateRoute>
          <Route path="/content/:id">
            <SingleContentItem favorites={favoriteItems} setFavorites={setFavoriteItems} />
          </Route>
          <PublicRoute exact path="/">
            <Home favorites={favoriteItems} setFavorites={setFavoriteItems} />
          </PublicRoute>
        </Switch>
      </PageLayout>
    </Router>
  );
}

export default App;
