import React, { useState, useRef, useEffect } from 'react';
import { useHistory } from 'react-router-dom';

import Form from '../components/Form';
import icon from '../images/eye-icon.svg';
import { isUserLoggedIn, signIn } from '../modules/auth';

// POST  https://academy-video-api.herokuapp.com/auth/login
// username: tester
// passowrd: netflix

function Login() {
  const history = useHistory();
  const [state, setState] = useState({ loginFailed: false });
  const usernameInput = useRef(null);
  const passwordInout = useRef(null);

  async function handleSubmit(e) {
    e.preventDefault();
    const credentials = {
      username: usernameInput.current.value,
      password: passwordInout.current.value,
    };
    try {
      await signIn(credentials);
      history.replace('/content');
    } catch (error) {
      setState({ loginFailed: true });
      console.log(error.message);
    }
  }

  useEffect(() => {
    usernameInput.current.focus();
  }, []);

  isUserLoggedIn() && history.push('/content');
  return (
    <div>
      <Form
        errorMessage={state.loginFailed && 'Login failed'}
        onSubmit={handleSubmit}
        submitButtonText="Sign In"
        inputs={[
          {
            id: 'username',
            displayName: 'Usename',
            type: 'text',
            ref: usernameInput,
          },
          {
            id: 'password',
            displayName: 'Password',
            type: 'password',
            icon,
            ref: passwordInout,
          },
        ]}
      ></Form>
    </div>
  );
}

export default Login;
