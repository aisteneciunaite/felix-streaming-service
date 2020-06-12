const tokenKey = 'x-auth-node';

export function saveToken(token) {
  token && localStorage.setItem(tokenKey, token);
}

export function getToken() {
  return localStorage.getItem(tokenKey);
}

export function removeToken() {
  localStorage.removeItem(tokenKey);
}

export function isUserLoggedIn() {
  return !!localStorage.getItem(tokenKey);
}

export default { saveToken, getToken, isUserLoggedIn };
