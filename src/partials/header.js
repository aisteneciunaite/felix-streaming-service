import React from 'react';
import { Link } from 'react-router-dom';

import Button from '../app/components/Button';

function Header() {
  return (
    <header>
      <Link className="logo" to="/">
        <span>F</span>
      </Link>
      <Button href="/login">Sign in</Button>
    </header>
  );
}

export default Header;
