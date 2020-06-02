import React from 'react';
import './index.scss';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

function Button({ children, className, onClick, href }) {
  const classes = className ? `Button ${className}` : 'Button';
  const Tag = href ? Link : 'button';

  return (
    <Tag to={href} className={classes} onClick={onClick}>
      {children}
    </Tag>
  );
}

Button.propTypes = {
  onClick: PropTypes.func,
  className: PropTypes.string,
};

export default Button;
