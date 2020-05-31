import React, { Component } from 'react';
import PropTypes from 'prop-types';
import './index.scss';

class Input extends Component {
  state = { type: this.props.input.type };

  togglePasswordDisplay() {
    this.setState(prevState => {
      let newType = prevState.type === 'password' ? 'text' : 'password';
      return { ...prevState, type: newType };
    });
  }

  render() {
    let { id, displayName, icon, autoFocus, type } = this.props.input;
    let iconElement = icon && (
      <img
        className="Input__icon"
        src={icon}
        alt=""
        onMouseDown={type === 'password' && this.togglePasswordDisplay.bind(this)}
        onMouseUp={type === 'password' && this.togglePasswordDisplay.bind(this)}
      />
    );
    return (
      <div className="Input">
        <label className="Input__label" htmlFor={id}>
          {displayName}
        </label>
        <div className="Input__box">
          <input autoFocus={autoFocus} className="Input__element" type={this.state.type} id={id} />
          {iconElement}
        </div>
      </div>
    );
  }
}

Input.prototypes = {
  input: PropTypes.exact({
    id: PropTypes.string.isRequired,
    displayName: PropTypes.string.isRequired,
    type: PropTypes.oneOf(['checkbox', 'email', 'number', 'password', 'radio', 'search'])
      .isRequired,
    icon: PropTypes.string,
  }),
};

export default Input;
