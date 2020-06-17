import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { bindActionCreators } from 'redux';

import content from '../../content';

import Button from '../components/Button';
import Hero from '../components/Hero';
import MovieCard from '../components/MovieCard';
import Spinner from '../components/Spinner';
import heroImage from '../images/cinema.jpg';

function Home() {
  const items = useSelector(state => content.selectors.getStoreItems(state));

  const fetchContent = bindActionCreators(content.actions.fetchContent, useDispatch());

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

export default Home;
