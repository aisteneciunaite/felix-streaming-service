export const getFavorites = state => state.content.favorites;

export const isFavoriteById = (state, id) => {
  return state.content.favorites.includes(id);
};

export const getStoreItems = state => state.content.items;

export const getMovieById = (state, id) =>
  state.content.items.list && state.content.items.list.find(item => item.id === id);

export const getStoreMoviesSource = state => state.content.items.source;

export const getContentError = state => state.content.error;
