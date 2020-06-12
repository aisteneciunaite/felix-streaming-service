import React, { useState, useRef, useEffect } from 'react';
import { bindActionCreators } from 'redux';
import { useHistory } from 'react-router-dom';
import { connect } from 'react-redux';

import auth from '../../authentication';

import Form from '../components/Form';
import { login } from '../modules/api';
import { saveToken } from '../modules/token';

// POST  https://academy-video-api.herokuapp.com/auth/login
// username: tester
// passowrd: netflix

async function signIn(credentials) {
  const { password, username } = credentials;
  if (!password || !username) throw new Error('Username and password can not be blank');
  const { token } = await login(credentials);
  if (!token) throw new Error('Login failed');
  saveToken(token);
  console.log('user logged in');
  return token;
}

function Login({ isLoggedIn, dispatchLogIn }) {
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
      const token = await signIn(credentials);
      dispatchLogIn(token);

      history.replace('/content');
    } catch (error) {
      setState({ loginFailed: true });
      console.log(error.message);
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
        errorMessage={state.loginFailed && 'Login failed'}
        onSubmit={handleSubmit}
        submitButtonText="Sign In"
        inputs={[
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
        ]}
      ></Form>
    </div>
  );
}

const enhance = connect(
  state => ({ isLoggedIn: auth.selectors.getLoginState(state) }),
  dispatch => ({ dispatchLogIn: bindActionCreators(auth.actions.login, dispatch) })
);

export default enhance(Login);
