import * as types from './types';
const DEFAULT_CONTENT_STATE = {
  items: {
    loading: false,
    source: null,
    error: null,
    list: [],
    free: null,
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
    case types.MOVIES_REQ:
      return { ...state, movies: { ...state.items, loading: true } };
    default:
      return state;
  }
}

export default contentReducer;
