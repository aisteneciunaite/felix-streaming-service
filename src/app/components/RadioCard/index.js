import React from 'react';
import './index.scss';

function RadioCard({ children, name, planId }) {
  return (
    <div className="RadioCard">
      <input type="radio" className="RadioCard__marker" name={name} id={planId} />
      {children}
    </div>
  );
}

export default RadioCard;
