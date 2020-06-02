import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import { isUserLoggedIn } from '../../modules/auth';

export function PrivateRoute(props) {
  return isUserLoggedIn() ? <Route {...props} /> : <Redirect to="/login" />;
}

export function PublicRoute(props) {
  return isUserLoggedIn() ? <Redirect to="/content" /> : <Route {...props} />;
}

export default { PrivateRoute, PublicRoute };
