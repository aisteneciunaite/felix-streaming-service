import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { bindActionCreators } from 'redux';

import content from '../../content';

import Movies from '../components/Movies';
import Button from '../components/Button';

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
        <Movies items={items} loading={loading}>
          <Button className="align-self-center">Get more content</Button>
        </Movies>
      </main>
    </>
  );
}

export default Content;
