import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import { useSelector } from 'react-redux';

import auth from '../../../authentication';

export function PublicRoute(props) {
  const authenticated = useSelector(state => !!auth.selectors.getToken(state));
  return authenticated ? <Redirect to="/content" /> : <Route {...props} />;
}

export default PublicRoute;
