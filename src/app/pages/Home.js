import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import content from '../../content';
import auth from '../../authentication';

import Button from '../components/Button';
import Hero from '../components/Hero';
import MovieCard from '../components/MovieCard';
import Spinner from '../components/Spinner';
import heroImage from '../images/cinema.jpg';

function Home({ items, fetchContent }) {
  useEffect(() => {
    (items.free !== true || !items.list.length) && fetchContent({ free: true });
  }, [fetchContent, items]);

  return (
    <>
      <Hero title="Wanna more Content ?" background={heroImage}>
        <Button to="/purchase">Get Access</Button>
      </Hero>

      <main>
        {items.loading ? (
          <Spinner />
        ) : (
          <>
            <div className="posters">
              {items.list && items.list.map(item => <MovieCard key={item.id} {...item} />)}
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
    items: content.selectors.getStoreItems(state),
  }),
  dispatch => ({
    fetchContent: bindActionCreators(content.actions.fetchContent, dispatch),
  })
);

export default enhance(Home);
