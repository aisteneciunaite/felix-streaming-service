export function getFavorites() {
  const favorites = JSON.parse(localStorage.getItem('favorites'));
  return favorites ? favorites : [];
}

export function isFavorite(itemId) {
  const favorites = getFavorites();
  if (!favorites.length) return false;
  return favorites.includes(itemId);
}

export function toggleFavorite(itemId) {
  let favorites = getFavorites();
  if (isFavorite(itemId)) {
    favorites = favorites.filter(item => item !== itemId);
  } else {
    favorites.push(itemId);
  }
  localStorage.setItem('favorites', JSON.stringify(favorites));
}
