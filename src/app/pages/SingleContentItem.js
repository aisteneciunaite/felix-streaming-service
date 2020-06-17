import React, { useEffect, useState, useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
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

function SingleContentItem() {
  const dispatch = useDispatch();
  const { id } = useParams();
  const history = useHistory();
  const authenticaded = useSelector(state => !!auth.selectors.getToken(state));

  const storeMovie = useSelector(state => content.selectors.getMovieById(state, id));
  const fetchItem = bindActionCreators(content.actions.fetchItem, dispatch);
  const saveSingleItem = bindActionCreators(content.actions.saveSingleItem, dispatch);
  const item = useSelector(state => content.selectors.getSingleItem(state));

  const fetchMovie = useCallback(() => {
    if (storeMovie) {
      saveSingleItem(storeMovie);
    } else {
      fetchItem(id);
    }
  }, [fetchItem, id, storeMovie, saveSingleItem]);

  //validate user is logged in
  useEffect(() => {
    item && !item.free && !authenticaded && history.replace('/login');
  }, [item, history, authenticaded]);

  useEffect(() => {
    if (item.id !== id) {
      fetchMovie();
    }
  }, [fetchMovie, id, item.id]);

  //validate url parameter, might be unnecesary
  useEffect(() => {
    !validateContentId(id) && history.push('/content');
  }, [id, history]);

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

export default SingleContentItem;
