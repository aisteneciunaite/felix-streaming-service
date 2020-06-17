import * as types from './types';
const DEFAULT_CONTENT_STATE = {
  items: {
    loading: false,
    source: null,
    error: null,
    list: [],
    free: null,
  },
  item: {
    loading: false,
    error: null,
    object: {},
  },
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
    case types.ADD_STORE_MOVIES: {
      return { ...state, items: { ...state.items, list: action.items } };
    }
    case types.SET_STORE_MOVIES_SOURCE: {
      console.log('movies source set to ', action.itemsSource);
      return { ...state, items: { ...state.items, source: action.itemsSource } };
    }
    case types.MOVIES_FAILURE: {
      return {
        ...state,
        items: { ...state.items, list: action.payload, error: action.error, loading: false },
      };
    }
    case types.MOVIES_SUCESS: {
      return {
        ...state,
        items: { ...state.items, list: action.payload, free: action.free, loading: false },
      };
    }
    // case types.MOVIES_REQ:
    //   return { ...state, items: { ...state.items, loading: true } };
    case types.MOVIE_REQ:
      return { ...state, items: { ...state.items, loading: true } };
    case types.MOVIE_SUCESS:
      return {
        ...state,
        item: { ...state.item, loading: false, error: null, object: action.payload },
      };
    case types.MOVIE_FAILURE:
      return {
        ...state,
        item: { ...state.item, loading: false, error: action.payload, object: {} },
      };
    default:
      return state;
  }
}

export const MOVIE_FAILURE = 'CONTENT.MOVIE_FAILURE';
export const MOVIE_SUCESS = 'CONTENT.MOVIE_SUCESS';
export const MOVIE_REQ = 'CONTENT.MOVIE_REQ';

export default contentReducer;
