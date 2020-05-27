import React from 'react';
import './index.scss';

function Button({ children, className, onClick }) {
  const classes = `Button ${className}`;

  return (
    <button className={classes} onClick={onClick}>
      {children}
    </button>
  );
}

export default Button;
