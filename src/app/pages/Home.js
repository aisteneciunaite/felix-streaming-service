import React, { useRef } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import content from '../../content';
import auth from '../../authentication';

import Button from '../components/Button';
import Hero from '../components/Hero';
import MovieCard from '../components/MovieCard';
import Spinner from '../components/Spinner';
import heroImage from '../images/cinema.jpg';

import useFetch from '../modules/useFetch';

function Home({ dispatchStoreMovies, token, storeItems }) {
  const headers = useRef({ authorization: token });
  const endpoint = '/content/free-items';

  const { isLoaded, payload: items } = useFetch(endpoint, 'GET', headers.current, storeItems);

  return (
    <>
      <Hero title="Wanna more Content ?" background={heroImage}>
        <Button to="/purchase">Get Access</Button>
      </Hero>

      <main>
        {!isLoaded ? (
          <Spinner />
        ) : (
          <>
            <div className="posters">
              {items && items.map(item => <MovieCard key={item.id} {...item} />)}
            </div>
            <Button to="/purchase" className="align-self-center">
              Get more content
            </Button>
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

export default enhance(Home);
