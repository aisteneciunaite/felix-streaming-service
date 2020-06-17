import * as types from './types';
const DEFAULT_CONTENT_STATE = {
  items: {
    source: null,
    error: null,
    list: [],
    free: null,
  },
  item: {
    error: null,
    object: {},
  },
  loading: false,
  favorites: JSON.parse(localStorage.getItem('favorites')) || [],
};

function contentReducer(state = DEFAULT_CONTENT_STATE, action) {
  switch (action.type) {
    case types.ADD_FAVORITE: {
      console.log('add favorite dispatched');
      return { ...state, favorites: [...state.favorites, action.id] };
    }
    case types.REMOVE_FAVORITE: {
      console.log('remove favorite dispatched');
      return { ...state, favorites: state.favorites.filter(id => id !== action.id) };
    }
    case types.MOVIES_REQ:
      return { ...state, loading: true };
    case types.MOVIES_SUCESS: {
      return {
        ...state,
        items: { ...state.items, list: action.payload, free: action.free, error: null },
        loading: false,
      };
    }
    case types.MOVIES_FAILURE: {
      return {
        ...state,
        items: { ...state.items, list: action.payload, error: action.error },
        loading: false,
      };
    }
    case types.MOVIE_REQ:
      return { ...state, loading: true };
    case types.MOVIE_SUCESS:
      return {
        ...state,
        item: { ...state.item, error: null, object: action.payload },
        loading: false,
      };
    case types.MOVIE_FAILURE:
      return {
        ...state,
        item: { ...state.item, error: action.error, object: {} },
        loading: false,
      };
    default:
      return state;
  }
}

export const MOVIE_FAILURE = 'CONTENT.MOVIE_FAILURE';
export const MOVIE_SUCESS = 'CONTENT.MOVIE_SUCESS';
export const MOVIE_REQ = 'CONTENT.MOVIE_REQ';

export default contentReducer;
