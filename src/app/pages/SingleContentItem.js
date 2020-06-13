import React, { useEffect, useState, useRef } from 'react';
import { connect } from 'react-redux';
import { useParams, useHistory } from 'react-router-dom';

import content from '../../content';
import auth from '../../authentication';

import useFetch from '../modules/useFetch';

import Spinner from '../components/Spinner';
import Title from '../components/Title';
import Button from '../components/Button';
import FavoriteButton from '../components/FavoriteButton';
import Poster from '../components/Poster';
import ModalVideo from '../components/ModalVideo';

function validateContentId(id) {
  return !!id.match(/(\w{6}-.*-\w{6})/g);
}

function SingleContentItem({ isLoggedIn, getStoreMovie, token }) {
  const { id } = useParams();
  const history = useHistory();

  //fetching content
  const headers = useRef({ authorization: token });
  const { isLoaded, payload: item } = useFetch(
    `/content/items/${id}`,
    'GET',
    headers.current,
    getStoreMovie(id),
    false
  );

  //validate url parameter, might be unnecesary
  useEffect(() => {
    !validateContentId(id) && history.push('/content');
  }, [id, history]);

  //validate user is logged in
  useEffect(() => {
    item && !item.free && !isLoggedIn && history.push('/login');
  }, [item, history, isLoggedIn]);

  //modal visible state
  const [showModal, setShowModal] = useState(false);
  function handleWatchBtnClick() {
    setShowModal(true);
  }

  return !isLoaded ? (
    <Spinner />
  ) : (
    <>
      <div className="SingleContentItem">
        <Poster url={item.image} />
        <div>
          <Title>{item.title}</Title>
          <p>{item.description}</p>
          <div>
            <Button onClick={handleWatchBtnClick} className="SingleContentItem__Button">
              Watch{' '}
              <span role="img" aria-label="watch">
                ▶️
              </span>
            </Button>
            <FavoriteButton id={item.id} />
          </div>
        </div>
      </div>
      {showModal && <ModalVideo setShowModal={setShowModal} video={item.video} />}
    </>
  );
}

const enhance = connect(state => ({
  isLoggedIn: auth.selectors.getLoginState(state),
  token: auth.selectors.getToken(state),
  getStoreMovie: id => content.selectors.getMovieById(state, id),
}));

export default enhance(SingleContentItem);
