import React from 'react';
import { Link, useHistory } from 'react-router-dom';
import { connect } from 'react-redux';

// components
import Button from '../Button';

// modules
import { logout } from '../../modules/api';
import { removeToken } from '../../modules/auth';

function Header({ isLoggedIn, dispatchLogOut, token }) {
  const history = useHistory();

  async function handleSignOut() {
    if (!isLoggedIn) return;
    await logout(token);
    dispatchLogOut(token);
    removeToken();
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
        <Button href="/login">Sign in</Button>
      )}
    </header>
  );
}
function mapStateToProps({ auth }) {
  return { isLoggedIn: auth.isLoggedIn, token: auth.token };
}
function mapDispatchToProps(dispatch) {
  return { dispatchLogOut: token => dispatch({ type: 'LOG_OUT', token }) };
}

export default connect(mapStateToProps, mapDispatchToProps)(Header);
