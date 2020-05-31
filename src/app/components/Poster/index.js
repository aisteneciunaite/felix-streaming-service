import React from 'react';
import Title from '../Title';
import Button from '../Button';
import PropTypes from 'prop-types';
import './index.scss';

function Poster({ title, description, image }) {
  const [isFavorite, setFavorite] = React.useState(false);
  let buttonText = isFavorite ? 'Remove 💔' : 'Favorite';

  let toggleFavorite = () => {
    setFavorite(prevState => !prevState);
  };
  return (
    <div className="Poster Poster__animate fadeIn">
      <img className="Poster__image" src={image} alt={title + ' poster'} />
      <div className="Poster__text">
        <Title level="2">{title}</Title>
        <p className="Poster__description">{description}</p>
        <Button onClick={toggleFavorite} className={isFavorite ? 'Button--active' : null}>
          {buttonText}
        </Button>
      </div>
    </div>
  );
}

Poster.propTypes = {
  title: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  image: PropTypes.string.isRequired,
};

export default Poster;
