import React, { useState } from 'react';
import PropTypes from 'prop-types';
import './index.scss';

function Input(props) {
  const [state, setstate] = useState({ type: props.input.type });

  function togglePasswordDisplay() {
    setstate(prevState => {
      let newType = prevState.type === 'password' ? 'text' : 'password';
      return { ...prevState, type: newType };
    });
  }
  let { id, displayName, icon, type, ref } = props.input;
  let iconElement = icon && (
    <img
      className="Input__icon"
      src={icon}
      alt=""
      onMouseDown={type === 'password' && togglePasswordDisplay}
      onMouseUp={type === 'password' && togglePasswordDisplay}
    />
  );
  return (
    <div className="Input">
      <label className="Input__label" htmlFor={id}>
        {displayName}
      </label>
      <div className="Input__box">
        <input className="Input__element" type={state.type} id={id} ref={ref} />
        {iconElement}
      </div>
    </div>
  );
}

Input.propTypes = {
  input: PropTypes.exact({
    id: PropTypes.string.isRequired,
    displayName: PropTypes.string.isRequired,
    type: PropTypes.oneOf(['checkbox', 'email', 'number', 'password', 'radio', 'search', 'text'])
      .isRequired,
    icon: PropTypes.string,
    autoFocus: PropTypes.bool,
    ref: PropTypes.any,
  }),
};

export default Input;
