import * as types from './types';

const TOKEN_KEY = 'x-auth-node';
const DEFAULT_AUTH_STATE = {
  isLoggedIn: !!localStorage.getItem(TOKEN_KEY),
  token: localStorage.getItem(TOKEN_KEY),
  error: null,
};

function authReducer(state = DEFAULT_AUTH_STATE, action) {
  switch (action.type) {
    case types.LOG_IN:
      action.token && localStorage.setItem(TOKEN_KEY, action.token);
      return { ...state, isLoggedIn: true, token: action.token };
    case types.LOG_OUT:
      localStorage.removeItem(TOKEN_KEY);
      return { ...state, isLoggedIn: false, token: null };
    case types.AUTH_ERROR: {
      return { ...state, error: action.error };
    }
    default:
      return state;
  }
}
export default authReducer;
