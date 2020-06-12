import React from 'react';
import { Link } from 'react-router-dom';

import Title from '../Title';
import FavoriteButton from '../FavoriteButton';
import PropTypes from 'prop-types';
import './index.scss';

function MovieCard({ title, description, image, id }) {
  return (
    <div className="MovieCard MovieCard__animate fadeIn">
      <Link to={'/content/' + id}>
        <img className="MovieCard__image" src={image} alt={title + ' MovieCard'} />
      </Link>
      <div className="MovieCard__text">
        <Link to={'/content/' + id}>
          <Title level="2">{title}</Title>
          <p className="MovieCard__description">{description}</p>
        </Link>
        <FavoriteButton id={id} />
      </div>
    </div>
  );
}

MovieCard.propTypes = {
  title: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  image: PropTypes.string.isRequired,
};

export default MovieCard;
