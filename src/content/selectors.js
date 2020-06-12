export const getFavorites = state => state.content.favorites;

export const isFavoriteById = (state, id) => {
  return state.content.favorites.includes(id);
};

export const getStoreItems = state => state.content.items;

export const getMovieById = (state, id) =>
  state.content.items && state.content.items.find(item => item.id === id);

export const getStoreMoviesSource = state => state.content.itemsSource;
