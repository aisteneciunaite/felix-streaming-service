import { login } from './api';
const tokenKey = 'x-auth-node';

export async function signIn(credentials) {
  const { password, username } = credentials;
  if (!password || !username) throw new Error('Username and password can not be blank');
  const { token } = await login(credentials);
  if (!token) throw new Error('Login failed');
  saveToken(token);
  console.log('user logged in');
}

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
