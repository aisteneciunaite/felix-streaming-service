import React from 'react';

import { useDispatch, useSelector } from 'react-redux';
import { bindActionCreators } from 'redux';

import content from '../../../content';

import Button from '../Button';

function FavoriteButton({ id }) {
  const isFavorite = useSelector(state => content.selectors.isFavoriteById(state, id));
  const toggleFavorite = bindActionCreators(content.actions.toggleFavorite, useDispatch());
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

export default FavoriteButton;
