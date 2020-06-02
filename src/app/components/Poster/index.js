import React from 'react';
import { useHistory } from 'react-router-dom';

import Title from '../Title';
import Button from '../Button';
import PropTypes from 'prop-types';
import './index.scss';

import { isUserLoggedIn } from '../../modules/auth';
import { isFavorite, toggleFavorite } from '../../modules/favorites';

function Poster({ title, description, image, id }) {
  const [isFavoriteState, setFavorite] = React.useState(isFavorite(id));
  const history = useHistory();

  const buttonText = isFavoriteState ? 'Remove 💔' : 'Favorite';

  const handleClick = () => {
    toggleFavorite(id);
    setFavorite(prevState => !prevState);
  };

  const goToContentPage = () => {
    if (!isUserLoggedIn()) return;
    history.push('/content/' + id);
  };

  return (
    <div className="Poster Poster__animate fadeIn">
      <img
        className="Poster__image"
        src={image}
        alt={title + ' poster'}
        onClick={goToContentPage}
      />
      <div className="Poster__text">
        <Title level="2" onClick={goToContentPage}>
          {title}
        </Title>
        <p className="Poster__description" onClick={goToContentPage}>
          {description}
        </p>
        <Button onClick={handleClick} className={isFavoriteState ? 'Button--active' : null}>
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
