import * as types from './types';

export const toggleFavorite = (id, isFavorite) => {
  if (typeof isFavorite === 'boolean') {
    return { type: isFavorite ? types.REMOVE_FAVORITE : types.ADD_FAVORITE, id };
  }
};

export const storeContent = items => ({ type: types.ADD_STORE_MOVIES, items });

export const setItemsSource = itemsSource => ({ type: types.SET_STORE_MOVIES_SOURCE, itemsSource });

export const fetchContent = ({ free } = {}) => async dispatch => {
  // dispatch({ type: types.MOVIES_REQ });
  const response = await fetch(
    `https://academy-video-api.herokuapp.com/content/${free ? 'free-' : ''}items`,
    {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        authorization: localStorage.getItem('x-auth-node'),
      },
    }
  );
  if (!response.ok) {
    dispatch({
      type: types.MOVIES_FAILURE,
      payload: await response.json(),
      error: 'Oops, only free content',
    });
  } else {
    dispatch({ type: types.MOVIES_SUCESS, payload: await response.json(), free: !!free });
  }
};

export const fetchItem = id => async dispatch => {
  // dispatch({ type: types.MOVIE_REQ });
  const response = await fetch('https://academy-video-api.herokuapp.com/content/items/' + id, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      authorization: localStorage.getItem('x-auth-node'),
    },
  });
  if (!response.ok) {
    dispatch({
      type: types.MOVIE_FAILURE,
      payload: await response.json(),
    });
  } else {
    dispatch({ type: types.MOVIE_SUCESS, payload: await response.json() });
  }
};

export const pushItem = item => ({ type: types.MOVIE_SUCESS, payload: item });
