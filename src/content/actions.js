import * as types from './types';

export const toggleFavorite = (id, isFavorite) => {
  if (typeof isFavorite === 'boolean') {
    return { type: isFavorite ? types.REMOVE_FAVORITE : types.ADD_FAVORITE, id };
  }
};

export const storeContent = items => ({ type: types.ADD_STORE_MOVIES, items });

export const setItemsSource = itemsSource => ({ type: types.SET_STORE_MOVIES_SOURCE, itemsSource });
