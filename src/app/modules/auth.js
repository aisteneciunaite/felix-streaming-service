import { login, logout } from './api';

export async function signIn(credentials) {
  const { password, username } = credentials;
  try {
    if (!password || !username) throw new Error('Username and password can not be blank');
    const { token } = await login(credentials);
    if (!token) throw new Error('Login failed');
    saveToken(token);
    console.log('user logged in');
  } catch (error) {
    console.log(error);
  }
}

export function saveToken(token) {
  token && localStorage.setItem('x-auth-node', token);
}
export function getToken() {
  return localStorage.getItem('x-auth-node');
}
export function isUserLoggedIn() {
  return !!localStorage.getItem('x-auth-node');
}

export async function signOut() {
  const token = getToken();
  try {
    if (token) {
      await logout(token);
      console.log('user signed out');
      localStorage.removeItem('x-auth-node');
    }
  } catch (error) {
    console.log(error);
  }
}

export default { saveToken, getToken, isUserLoggedIn, signOut };
