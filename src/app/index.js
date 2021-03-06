import './index.scss';
import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import { Provider } from 'react-redux';

import store from './state';

//Components
import PrivateRoute from './components/Routing/PrivateRoute';
import PublicRoute from './components/Routing/PublicRoute';
import PageLayout from './components/PageLayout';
//Pages
import Home from './pages/Home';
import Login from './pages/Login';
import Content from './pages/Content';
import SingleContentItem from './pages/SingleContentItem';
import Purchase from './pages/Purchase';

function App() {
  // console.log(store.getState());
  return (
    <Provider store={store}>
      <Router>
        <PageLayout>
          <Switch>
            <PublicRoute path="/login">
              <Login />
            </PublicRoute>
            <PrivateRoute exact path="/content">
              <Content />
            </PrivateRoute>
            <Route path="/content/:id">
              <SingleContentItem />
            </Route>
            <PublicRoute exact path="/purchase">
              <Purchase />
            </PublicRoute>
            <PublicRoute exact path="/">
              <Home />
            </PublicRoute>
          </Switch>
        </PageLayout>
      </Router>
    </Provider>
  );
}

export default App;
