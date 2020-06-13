import React, { useRef } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import content from '../../content';
import auth from '../../authentication';

import Button from '../components/Button';
import MovieCard from '../components/MovieCard';
import Spinner from '../components/Spinner';
import useFetch from '../modules/useFetch';

function Content({ dispatchStoreMovies, token, storeItems }) {
  const headers = useRef({ authorization: token });
  const endpoint = '/content/items';

  const { isLoaded, payload: items } = useFetch(endpoint, 'GET', headers.current, storeItems);

  return (
    <>
      <main>
        {!isLoaded ? (
          <Spinner />
        ) : (
          <>
            <div className="posters">
              {items && items.map(item => <MovieCard key={item.id} {...item} />)}
            </div>
            <Button className="align-self-center">Get more content</Button>
          </>
        )}
      </main>
    </>
  );
}

const enhance = connect(
  state => ({
    token: auth.selectors.getToken(state),
    storeItems: content.selectors.getStoreItems(state),
  }),
  dispatch => ({
    dispatchStoreMovies: bindActionCreators(content.actions.storeContent, dispatch),
  })
);

export default enhance(Content);
