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
        <span className="Form__alert">{this.props.errorMessage}</span>
        <Button className="align-self-center" onClick={this.props.onSubmit}>
          {this.props.submitButtonText}
        </Button>
      </form>
    );
  }
}

Form.propTypes = {
  submitButtonText: PropTypes.string.isRequired,
};

export default Form;
