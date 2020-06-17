import React, { useEffect, useState, useCallback } from 'react';
import { connect, useDispatch, useSelector } from 'react-redux';
import { useParams, useHistory } from 'react-router-dom';

import content from '../../content';
import auth from '../../authentication';

import Spinner from '../components/Spinner';
import Title from '../components/Title';
import Button from '../components/Button';
import FavoriteButton from '../components/FavoriteButton';
import Poster from '../components/Poster';
import ModalVideo from '../components/ModalVideo';
import { bindActionCreators } from 'redux';

function validateContentId(id) {
  return !!id.match(/(\w{6}-.*-\w{6})/g);
}

function SingleContentItem({ authenticaded, token }) {
  const dispatch = useDispatch();
  const { id } = useParams();
  const history = useHistory();

  const storeMovie = useSelector(state => content.selectors.getMovieById(state, id));
  const fetchItem = bindActionCreators(content.actions.fetchItem, dispatch);
  const pushItem = bindActionCreators(content.actions.pushItem, dispatch);
  const item = useSelector(state => content.selectors.getSingleItem(state));

  const fetchMovie = useCallback(() => {
    if (storeMovie) {
      pushItem(storeMovie);
    } else {
      fetchItem(id);
    }
  }, [fetchItem, id, storeMovie, pushItem]);

  useEffect(() => {
    if (item.id !== id) {
      fetchMovie();
    }
  }, [fetchMovie, id, item.id]);

  //validate url parameter, might be unnecesary
  useEffect(() => {
    !validateContentId(id) && history.push('/content');
  }, [id, history]);

  //validate user is logged in
  useEffect(() => {
    item && !item.free && !authenticaded && history.push('/login');
  }, [item, history, authenticaded]);

  //modal visible state
  const [showModal, setShowModal] = useState(false);
  function handleWatchBtnClick() {
    setShowModal(true);
  }

  return !item ? (
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
  authenticaded: !!auth.selectors.getToken(state),
  token: auth.selectors.getToken(state),
}));

export default enhance(SingleContentItem);
