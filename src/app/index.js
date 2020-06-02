import './index.scss';
import React from 'react';
import { BrowserRouter as Router, Switch } from 'react-router-dom';

import { PrivateRoute, PublicRoute } from './components/Routing';
import PageLayout from './components/PageLayout';
import Home from './pages/Home';
import Login from './pages/Login';
import Content from './pages/Content';
import SingleContentItem from './pages/SingleContentItem';

function App() {
  return (
    <Router>
      <PageLayout>
        <Switch>
          <PublicRoute path="/login">
            <Login />
          </PublicRoute>
          <PrivateRoute exact path="/content">
            <Content />
          </PrivateRoute>
          <PrivateRoute path="/content/:id">
            <SingleContentItem />
          </PrivateRoute>
          <PublicRoute exact path="/">
            <Home />
          </PublicRoute>
        </Switch>
      </PageLayout>
    </Router>
  );
}

export default App;
