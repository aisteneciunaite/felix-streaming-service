import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { bindActionCreators } from 'redux';

import content from '../../content';

import Button from '../components/Button';
import MovieCard from '../components/MovieCard';
import Spinner from '../components/Spinner';

function Content() {
  const items = useSelector(state => content.selectors.getStoreItems(state));
  const isFree = useSelector(state => content.selectors.isStoreItemsFree(state));
  const loading = useSelector(state => content.selectors.isContentLoading(state));

  const fetchContent = bindActionCreators(content.actions.fetchContent, useDispatch());

  useEffect(() => {
    if ((isFree !== false || !items.length) && !loading) {
      fetchContent();
    }
  }, [fetchContent, items.length, isFree, loading]);
  return (
    <>
      <main>
        {loading ? (
          <Spinner />
        ) : (
          <>
            <div className="posters">
              {items.length && items.map(item => <MovieCard key={item.id} {...item} />)}
            </div>
            <Button className="align-self-center">Get more content</Button>
          </>
        )}
      </main>
    </>
  );
}

export default Content;
