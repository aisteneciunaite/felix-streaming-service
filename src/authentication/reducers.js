import { isUserLoggedIn, getToken } from '../app/modules/token';

import * as types from './types';

const DEFAULT_AUTH_STATE = {
  isLoggedIn: isUserLoggedIn(),
  token: getToken(),
  error: null,
};

function authReducer(state = DEFAULT_AUTH_STATE, action) {
  switch (action.type) {
    case types.LOG_IN:
      return { ...state, isLoggedIn: true, token: action.token };
    case types.LOG_OUT:
      return { ...state, isLoggedIn: false, token: null };
    case types.AUTH_ERROR: {
      return { ...state, error: action.error };
    }
    default:
      return state;
  }
}
export default authReducer;
