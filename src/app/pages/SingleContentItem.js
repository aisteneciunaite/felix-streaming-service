import React, { useEffect, useState, useCallback } from 'react';
import { useParams, useHistory } from 'react-router-dom';
import { fetchItem } from '../modules/api';

import Spinner from '../components/Spinner';
import Title from '../components/Title';
import Button from '../components/Button';
import FavoriteButton from '../components/FavoriteButton';
import Poster from '../components/Poster';
import ModalVideo from '../components/ModalVideo';
import { isUserLoggedIn } from '../modules/auth';

function validateContentId(id) {
  return !!id.match(/(\w{6}-.*-\w{6})/g);
}

function SingleContentItem() {
  const { id } = useParams();
  const history = useHistory();
  const userLoggedIn = isUserLoggedIn();

  const [state, setState] = useState({ isLoaded: false, item: {} });
  const [showModal, setShowModal] = useState(false);
  const { image, title, description, video } = state.item;

  const getItem = useCallback(async () => {
    try {
      if (validateContentId(id)) {
        const item = await fetchItem(id);
        setState({ isLoaded: true, item });
        if (!item.free && !userLoggedIn) history.push('/login');
      } else {
        history.push('/content');
      }
    } catch (error) {
      console.log(error);
    }
  }, [id, history, userLoggedIn]);

  useEffect(() => {
    getItem();
  }, [getItem]);

  function handleWatchBtnClick() {
    setShowModal(true);
  }

  return !state.isLoaded ? (
    <Spinner />
  ) : (
    <>
      <div className="SingleContentItem">
        <Poster url={image} />
        <div>
          <Title>{title}</Title>
          <p>{description}</p>
          <div>
            <Button onClick={handleWatchBtnClick} className="SingleContentItem__Button">
              Watch{' '}
              <span role="img" aria-label="watch">
                ▶️
              </span>
            </Button>
            <FavoriteButton id={state.item.id} />
          </div>
        </div>
      </div>
      {showModal && <ModalVideo setShowModal={setShowModal} video={video} />}
    </>
  );
}

export default SingleContentItem;
