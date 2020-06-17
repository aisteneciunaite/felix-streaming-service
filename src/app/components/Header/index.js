import React from 'react';
import { Link, useHistory } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { bindActionCreators } from 'redux';

// components
import Button from '../Button';

// state management
import auth from '../../../authentication';

// modules

function Header() {
  const history = useHistory();
  const authenticaded = useSelector(state => !!auth.selectors.getToken(state));
  const token = useSelector(state => auth.selectors.getToken(state));
  const logout = bindActionCreators(auth.actions.logout, useDispatch());

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

export default Header;
