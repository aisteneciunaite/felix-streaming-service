import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';

import auth from '../../../authentication';

function PrivateRoute(props) {
  return props.isLoggedIn ? <Route {...props} /> : <Redirect to="/login" />;
}

const enhance = connect(state => ({ isLoggedIn: auth.selectors.getLoginState(state) }));

export default enhance(PrivateRoute);
