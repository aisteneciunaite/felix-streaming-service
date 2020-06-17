import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { bindActionCreators } from 'redux';

import content from '../../content';

import Button from '../components/Button';
import MovieCard from '../components/MovieCard';
import Spinner from '../components/Spinner';

function Content() {
  const items = useSelector(state => content.selectors.getStoreItems(state));
  const fetchContent = bindActionCreators(content.actions.fetchContent, useDispatch());

  useEffect(() => {
    (items.free !== false || !items.list.length) && fetchContent();
  }, [fetchContent, items]);
  return (
    <>
      <main>
        {items.loading ? (
          <Spinner />
        ) : (
          <>
            <div className="posters">
              {items.list.length && items.list.map(item => <MovieCard key={item.id} {...item} />)}
            </div>
            <Button className="align-self-center">Get more content</Button>
          </>
        )}
      </main>
    </>
  );
}

export default Content;
