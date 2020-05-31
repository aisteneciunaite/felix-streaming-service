import React from 'react';
import Form from '../components/Form';
import icon from '../images/eye-icon.svg';

class Login extends React.Component {
  render() {
    return (
      <div>
        <Form
          submitButtonText="Sign In"
          inputs={[
            { id: 'username', displayName: 'Usename', type: 'text', autoFocus: true },
            { id: 'password', displayName: 'Password', type: 'password', icon },
          ]}
        ></Form>
      </div>
    );
  }
}

export default Login;
