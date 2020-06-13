import React from 'react';
import { Link, useHistory } from 'react-router-dom';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

// components
import Button from '../Button';

// state management
import auth from '../../../authentication';

// modules
import { logout } from '../../modules/api';
// import { removeToken } from '../../modules/token';

function Header({ isLoggedIn, dispatchLogOut, token }) {
  const history = useHistory();

  async function handleSignOut() {
    if (!isLoggedIn) return;
    await logout(token);
    dispatchLogOut(token);
    // removeToken();
    console.log('user logged out');
    history.push('/');
  }

  return (
    <header>
      <Link className="logo" to="/">
        <span>F</span>
      </Link>
      {isLoggedIn ? (
        <Button onClick={handleSignOut}>Sign out</Button>
      ) : (
        <Button to="/login">Sign in</Button>
      )}
    </header>
  );
}
const enhance = connect(
  state => ({
    isLoggedIn: auth.selectors.getLoginState(state),
    token: auth.selectors.getToken(state),
  }),
  dispatch => ({ dispatchLogOut: bindActionCreators(auth.actions.logout, dispatch) })
);

export default enhance(Header);
