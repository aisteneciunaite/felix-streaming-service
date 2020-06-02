import React from 'react';
import { withRouter } from 'react-router-dom';

import Form from '../components/Form';
import icon from '../images/eye-icon.svg';
import { isUserLoggedIn, signIn } from '../modules/auth';

// POST  https://academy-video-api.herokuapp.com/auth/login
// username: tester
// passowrd: netflix

class Login extends React.Component {
  constructor(props) {
    super(props);
    this.usernameInput = React.createRef();
    this.passwordInout = React.createRef();
    this.state = {
      loginFailed: false,
    };
  }

  handleSubmit = async e => {
    e.preventDefault();
    const { history } = this.props;
    const credentials = {
      username: this.usernameInput.current.value,
      password: this.passwordInout.current.value,
    };
    try {
      await signIn(credentials);
      history.push('/content');
    } catch (error) {
      this.setState({ loginFailed: true });
      console.log(error.message);
    }
  };

  render() {
    const { history } = this.props;
    isUserLoggedIn() && history.push('/content');
    return (
      <div>
        <Form
          errorMessage={this.state.loginFailed && 'Login failed'}
          onSubmit={this.handleSubmit}
          submitButtonText="Sign In"
          inputs={[
            {
              id: 'username',
              displayName: 'Usename',
              type: 'text',
              autoFocus: true,
              ref: this.usernameInput,
            },
            {
              id: 'password',
              displayName: 'Password',
              type: 'password',
              icon,
              ref: this.passwordInout,
            },
          ]}
        ></Form>
      </div>
    );
  }
}

export default withRouter(Login);
