import React from 'react';
import { Link, useHistory } from 'react-router-dom';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

// components
import Button from '../Button';

// state management
import auth from '../../../authentication';

// modules

function Header({ authenticaded, token, logout }) {
  const history = useHistory();

  async function handleSignOut() {
    if (!authenticaded) return;
    await logout(token);
    console.log('user logged out');
    history.push('/');
  }

  return (
    <header>
      <Link className="logo" to="/">
        <span>F</span>
      </Link>
      {authenticaded ? (
        <Button onClick={handleSignOut}>Sign out</Button>
      ) : (
        <Button to="/login">Sign in</Button>
      )}
    </header>
  );
}
const enhance = connect(
  state => ({
    authenticaded: !!auth.selectors.getToken(state),
    token: auth.selectors.getToken(state),
  }),
  dispatch => ({
    logout: bindActionCreators(auth.actions.logout__xx, dispatch),
  })
);

export default enhance(Header);
