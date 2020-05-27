import React from 'react';
import './index.css';

function Title({ children, level = 1 }) {
  const Tag = level > 6 || level < 1 ? 'h1' : `h${level}`;

  return <Tag className="Title">{children}</Tag>;
}

export default Title;
