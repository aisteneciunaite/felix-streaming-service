import React from 'react';
import './index.scss';

function Poster({ url }) {
  return (
    <picture className="Poster">
      <img src={url} alt="" />
    </picture>
  );
}

export default Poster;
