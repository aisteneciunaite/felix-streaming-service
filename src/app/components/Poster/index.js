import React from 'react';
import Title from '../Title';
import Button from '../Button';
import './index.scss';

function Poster({ title, description, image }) {
  const [isFavorite, setFavorite] = React.useState(false);
  let text = description.slice(0, 100) + '...';
  let buttonText = isFavorite ? 'Remove 💔' : 'Favorite';

  let toggleFavorite = () => {
    setFavorite(!isFavorite);
  };
  return (
    <div className="Poster">
      <img className="Poster__image" src={image} alt={title + ' poster'} />
      <div className="Poster__text">
        <Title level="2">{title}</Title>
        <p>{text}</p>
        <Button onClick={toggleFavorite} className={isFavorite ? 'Button--active' : null}>
          {buttonText}
        </Button>
      </div>
    </div>
  );
}

export default Poster;
