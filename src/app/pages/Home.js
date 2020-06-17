import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { bindActionCreators } from 'redux';

import content from '../../content';

import Button from '../components/Button';
import Hero from '../components/Hero';
import Movies from '../components/Movies';
import heroImage from '../images/cinema.jpg';

function Home() {
  const items = useSelector(state => content.selectors.getStoreItems(state));
  const isFree = useSelector(state => content.selectors.isStoreItemsFree(state));
  const loading = useSelector(state => content.selectors.isContentLoading(state));

  const fetchContent = bindActionCreators(content.actions.fetchContent, useDispatch());

  useEffect(() => {
    if ((isFree !== true || !items.length) && !loading) {
      fetchContent({ free: true });
    }
  }, [fetchContent, items.length, loading, isFree]);

  return (
    <>
      <Hero title="Wanna more Content ?" background={heroImage}>
        <Button to="/purchase">Get Access</Button>
      </Hero>

      <main>
        <Movies items={items} loading={loading}>
          <Button to="/purchase" className="align-self-center">
            Get more content
          </Button>
        </Movies>
      </main>
    </>
  );
}

export default Home;
