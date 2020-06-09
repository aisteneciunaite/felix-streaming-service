import { isUserLoggedIn, getToken, removeToken } from '../modules/auth';

const DEFAULT_AUTH_STATE = {
  isLoggedIn: isUserLoggedIn(),
  token: getToken(),
};

function authReducer(state = DEFAULT_AUTH_STATE, action) {
  switch (action.type) {
    case 'LOG_IN':
      return { ...state, isLoggedIn: true, token: action.token };
    case 'LOG_OUT':
      removeToken();
      return { ...state, isLoggedIn: false, token: null };
    default:
      return state;
  }
}
export default authReducer;
