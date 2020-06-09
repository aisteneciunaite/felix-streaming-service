import { getFavorites } from '../modules/favorites';

const DEFAULT_CONTENT_STATE = {
  favorites: getFavorites(),
};

function contentReducer(state = DEFAULT_CONTENT_STATE, action) {
  switch (action.type) {
    case 'ADD_FAVORITE': {
      console.log('add favorite dispatched');
      return { ...state, favorites: [...state.favorites, action.id] };
    }
    case 'REMOVE_FAVORITE': {
      console.log('remove favorite dispatched');
      return { ...state, favorites: state.favorites.filter(id => id !== action.id) };
    }
    default:
      return state;
  }
}

export default contentReducer;
