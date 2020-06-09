import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { saveFavorites } from '../../modules/favorites';

import Button from '../Button';

function FavoriteButton({ id, favorites, addFavorite, removeFavorite }) {
  const isFavorite = favorites.includes(id);
  const buttonText = isFavorite ? 'Remove 💔' : 'Favorite';

  const handleClick = () => {
    favorites.includes(id) ? removeFavorite(id) : addFavorite(id);
  };

  useEffect(() => {
    saveFavorites(favorites);
  }, [favorites]);

  return (
    <Button onClick={handleClick} className={isFavorite ? 'Button--active' : null}>
      {buttonText}
    </Button>
  );
}

function mapStateToProps({ content }) {
  return { favorites: content.favorites };
}
function mapDispatchToProps(dispatch) {
  return {
    addFavorite: id => dispatch({ type: 'ADD_FAVORITE', id }),
    removeFavorite: id => dispatch({ type: 'REMOVE_FAVORITE', id }),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(FavoriteButton);
