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
