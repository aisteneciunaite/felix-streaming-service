import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';

import auth from '../../../authentication';

export function PublicRoute(props) {
  return props.isLoggedIn ? <Redirect to="/content" /> : <Route {...props} />;
}

const enhance = connect(state => ({ isLoggedIn: auth.selectors.getLoginState(state) }));

export default enhance(PublicRoute);
