import './index.scss';

import React from 'react';
import PropTypes from 'prop-types';

import Button from '../Button';
import Input from '../Input';

function Form(props) {
  return (
    <form className="Form">
      {props.inputs.map(input => (
        <Input input={input} key={input.id} />
      ))}
      <span className="Form__alert">{props.errorMessage}</span>
      <Button className="align-self-center" onClick={props.onSubmit}>
        {props.submitButtonText}
      </Button>
    </form>
  );
}

Form.propTypes = {
  submitButtonText: PropTypes.string.isRequired,
};

export default Form;
