import React from 'react';
import { Link, Route, Switch } from 'react-router-dom';

// import
import Button from '../Button';
import { signOut } from '../../modules/auth';

function Header() {
  return (
    <header>
      <Link className="logo" to="/">
        <span>F</span>
      </Link>
      <Switch>
        {['/', '/login', '/register'].map(path => (
          <Route key={path} exact path={path}>
            <Button href="/login">Sign in</Button>
          </Route>
        ))}
        <Route>
          <Button onClick={signOut} href="/">
            Sign out
          </Button>
        </Route>
      </Switch>
    </header>
  );
}

export default Header;
