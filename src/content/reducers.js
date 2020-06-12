import * as types from './types';
const DEFAULT_CONTENT_STATE = {
  items: null,
  itemsSource: null,
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
      return { ...state, items: action.items };
    }
    case types.SET_STORE_MOVIES_SOURCE: {
      console.log('movies source set to ', action.itemsSource);
      return { ...state, itemsSource: action.itemsSource };
    }
    default:
      return state;
  }
}

export default contentReducer;
