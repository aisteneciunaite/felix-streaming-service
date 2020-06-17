import * as types from './types';
const SERVER_URL = 'https://academy-video-api.herokuapp.com';

export const login = ({ username, password }) => async dispatch => {
  dispatch({ type: types.LOGIN_REQ });

  const response = await fetch(SERVER_URL + '/auth/login', {
    method: 'POST',
    body: JSON.stringify({ username, password }),
    headers: {
      'Content-Type': 'application/json',
    },
  });
  if (response.ok) {
    return dispatch({ type: types.LOGIN_SUCESS, payload: await response.json() });
  } else {
    dispatch({ type: types.LOGIN_FAILURE, payload: await response.json() });
  }
};

export const logout__xx = token => async dispatch => {
  dispatch({ type: types.LOGOUT_REQ });

  const response = await fetch(SERVER_URL + '/auth/logout', {
    method: 'POST',
    body: JSON.stringify({ token }),
    headers: {
      'Content-Type': 'application/json',
    },
  });
  if (response.ok) {
    dispatch({ type: types.LOGOUT_SUCESS });
  } else {
    dispatch({ type: types.LOGOUT_FAILURE, payload: await response.json() });
  }
};
