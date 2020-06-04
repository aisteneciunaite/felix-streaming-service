import React from 'react';
import { Link, useHistory } from 'react-router-dom';

// import
import Button from '../Button';
import { removeToken, isUserLoggedIn, getToken } from '../../modules/auth';
import { logout } from '../../modules/api';

function Header() {
  const userLoggedIn = isUserLoggedIn();

  const history = useHistory();
  async function handleSignOut() {
    if (!userLoggedIn) return;
    const token = getToken();
    await logout(token);
    removeToken();
    console.log('user logged out');
    history.push('/');
  }

  return (
    <header>
      <Link className="logo" to="/">
        <span>F</span>
      </Link>
      {userLoggedIn ? (
        <Button onClick={handleSignOut}>Sign out</Button>
      ) : (
        <Button href="/login">Sign in</Button>
      )}
    </header>
  );
}

export default Header;
