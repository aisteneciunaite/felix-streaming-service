import React, { useRef, useEffect } from 'react';
import { bindActionCreators } from 'redux';
import { useHistory } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';

import auth from '../../authentication';

import Form from '../components/Form';
import Input from '../components/Input';

// POST  https://academy-video-api.herokuapp.com/auth/login
// username: tester
// passowrd: netflix

function Login() {
  const history = useHistory();
  const authenticated = useSelector(state => !!auth.selectors.getToken(state));
  const status = useSelector(state => auth.selectors.getStatus(state));
  const login = bindActionCreators(auth.actions.login, useDispatch());

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
      if (!credentials.password || !credentials.username)
        throw new Error('Username and password can not be blank');
      await login(credentials);
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    authenticated && history.replace('/content');
  }, [history, authenticated]);

  useEffect(() => {
    usernameInput.current.focus();
  }, []);

  useEffect(() => {
    authenticated && history.push('/content');
  }, [authenticated, history]);

  return (
    <div>
      <Form
        errorMessage={!!status.error && 'Login failed'}
        onSubmit={handleSubmit}
        submitButtonText="Sign In"
        className="Login__Form"
      >
        {inputs.map(input => (
          <Input input={input} key={input.id} />
        ))}
      </Form>
    </div>
  );
}

export default Login;
