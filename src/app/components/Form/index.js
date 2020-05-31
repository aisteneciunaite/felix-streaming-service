import './index.scss';

import React, { Component } from 'react';
import PropTypes from 'prop-types';

import Button from '../Button';
import Input from '../Input';

class Form extends Component {
  render() {
    return (
      <form className="Form">
        {this.props.inputs.map(input => (
          <Input input={input} key={input.id} />
        ))}
        <Button className="align-self-center">{this.props.submitButtonText}</Button>
      </form>
    );
  }
}

Form.prototypes = {
  submitButtonText: PropTypes.string.isRequired,
};

export default Form;
