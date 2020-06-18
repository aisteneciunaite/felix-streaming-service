export const getFavorites = state => state.content.favorites;
export const isFavoriteById = (state, id) => {
  const favorites = getFavorites(state);
  return favorites.includes(id);
};

export const getStoreItems = state => state.content.items.list;

export const isStoreItemsFree = state => state.content.items.free;

export const getMovieById = (state, id) => {
  const items = getStoreItems(state);
  return items.find(item => item.id === id);
};

export const getStoreMoviesSource = state => state.content.items.source;

export const getContentError = state => state.content.error;

export const isContentLoading = state => state.content.loading;
