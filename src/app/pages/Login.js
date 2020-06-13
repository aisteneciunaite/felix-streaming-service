import React, { useRef, useEffect } from 'react';
import { bindActionCreators } from 'redux';
import { useHistory } from 'react-router-dom';
import { connect } from 'react-redux';

import auth from '../../authentication';

import Form from '../components/Form';
import Input from '../components/Input';

import { login } from '../modules/api';

// POST  https://academy-video-api.herokuapp.com/auth/login
// username: tester
// passowrd: netflix

async function signIn(credentials) {
  const { password, username } = credentials;
  if (!password || !username) throw new Error('Username and password can not be blank');
  const { token } = await login(credentials);
  if (!token) throw new Error('Login failed');
  console.log('user logged in');
  return token;
}

function Login({ isLoggedIn, dispatchLogIn, authError, setAuthError }) {
  const history = useHistory();
  const usernameInput = useRef(null);
  const passwordInout = useRef(null);

  const inputs = [
    {
      id: 'username',
      labelContent: 'Usename',
      type: 'text',
      ref: usernameInput,
    },
    {
      id: 'password',
      labelContent: 'Password',
      type: 'password',
      ref: passwordInout,
    },
  ];

  async function handleSubmit(e) {
    e.preventDefault();
    const credentials = {
      username: usernameInput.current.value,
      password: passwordInout.current.value,
    };
    try {
      const token = await signIn(credentials);
      dispatchLogIn(token);
      authError && setAuthError(null);
      history.replace('/content');
    } catch (error) {
      setAuthError(error);
      console.log(error);
    }
  }

  useEffect(() => {
    usernameInput.current.focus();
  }, []);

  useEffect(() => {
    isLoggedIn && history.push('/content');
  }, [isLoggedIn, history]);

  return (
    <div>
      <Form
        errorMessage={authError && 'Login failed'}
        onSubmit={handleSubmit}
        submitButtonText="Sign In"
      >
        {inputs.map(input => (
          <Input input={input} key={input.id} />
        ))}
      </Form>
    </div>
  );
}

const enhance = connect(
  state => ({
    isLoggedIn: auth.selectors.getLoginState(state),
    authError: auth.selectors.getAuthError(state),
  }),
  dispatch => ({
    dispatchLogIn: bindActionCreators(auth.actions.login, dispatch),
    setAuthError: bindActionCreators(auth.actions.setAuthError, dispatch),
  })
);

export default enhance(Login);
