import React from 'react';

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import content from '../../../content';

import Button from '../Button';

function FavoriteButton({ id, favorites, isFavorite, toggleFavorite }) {
  const buttonText = isFavorite ? 'Remove 💔' : 'Favorite';

  const handleClick = () => {
    toggleFavorite(id, isFavorite);
  };
  return (
    <Button onClick={handleClick} className={isFavorite ? 'Button--active' : null}>
      {buttonText}
    </Button>
  );
}

const enhance = connect(
  (state, { id }) => ({
    favorites: content.selectors.getFavorites(state),
    isFavorite: content.selectors.isFavoriteById(state, id),
  }),
  dispatch => ({ toggleFavorite: bindActionCreators(content.actions.toggleFavorite, dispatch) })
);

export default enhance(FavoriteButton);
