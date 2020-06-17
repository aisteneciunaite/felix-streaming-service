import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import content from '../../content';

import Button from '../components/Button';
import MovieCard from '../components/MovieCard';
import Spinner from '../components/Spinner';

function Content({ items, fetchContent }) {
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

const enhance = connect(
  state => ({
    items: content.selectors.getStoreItems(state),
  }),
  dispatch => ({
    fetchContent: bindActionCreators(content.actions.fetchContent, dispatch),
  })
);

export default enhance(Content);
