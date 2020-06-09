import React from 'react';
import { Link } from 'react-router-dom';

import Title from '../Title';
import FavoriteButton from '../FavoriteButton';
import PropTypes from 'prop-types';
import './index.scss';

function Card({ title, description, image, id }) {
  return (
    <div className="Card Card__animate fadeIn">
      <Link to={'/content/' + id}>
        <img className="Card__image" src={image} alt={title + ' Card'} />
      </Link>
      <div className="Card__text">
        <Link to={'/content/' + id}>
          <Title level="2">{title}</Title>
          <p className="Card__description">{description}</p>
        </Link>
        <FavoriteButton id={id} />
      </div>
    </div>
  );
}

Card.propTypes = {
  title: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  image: PropTypes.string.isRequired,
};

export default Card;
