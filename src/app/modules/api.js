import { getToken } from './auth';

// post: /auth/login
// post: /auth/signup
// post: /auth/logout
// get: /content/free-items
// get: /content/items
// get: /content/items/:itemId

const SERVER_URL = 'https://academy-video-api.herokuapp.com';

export async function login({ username, password }) {
  const response = await fetch(SERVER_URL + '/auth/login', {
    method: 'POST',
    body: JSON.stringify({ username, password }),
    headers: {
      'Content-Type': 'application/json',
    },
  });
  if (!response.ok) throw response;
  return await response.json();
}

export async function logout(token) {
  const response = await fetch(SERVER_URL + '/auth/logout', {
    method: 'POST',
    body: JSON.stringify({ token }),
    headers: {
      'Content-Type': 'application/json',
    },
  });
  if (!response.ok) throw response;
  return await response.ok;
}

export async function register(data) {
  const response = await fetch(SERVER_URL + '/auth/signup', {
    method: 'POST',
    body: JSON.stringify(data),
    headers: {
      'Content-Type': 'application/json',
    },
  });
  if (!response.ok) throw response;
  return await response.json();
}

export async function fetchFreeItems() {
  const response = await fetch(SERVER_URL + '/content/free-items');
  if (!response.ok) throw new Error('fetch failed');
  return await response.json();
}

export async function fetchItems() {
  const token = getToken();
  const response = await fetch(SERVER_URL + '/content/items', {
    method: 'GET',
    headers: {
      authorization: token,
    },
  });
  if (!response.ok) throw response;
  return await response.json();
}

export async function fetchItem(id) {
  const token = getToken();
  const response = await fetch(SERVER_URL + '/content/items/' + id, {
    method: 'GET',
    headers: {
      authorisation: token,
    },
  });
  if (!response.ok) throw new Error('fetch failed');
  return await response.json();
}
