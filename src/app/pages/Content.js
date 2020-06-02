import React, { useState, useEffect } from 'react';

import Button from '../components/Button';
import Poster from '../components/Poster';
import Spinner from '../components/Spinner';

import { fetchItems } from '../modules/api';

function Content() {
  const [state, setState] = useState({
    error: null,
    isLoaded: false,
    items: [],
  });
  const { isLoaded, items } = state;

  useEffect(() => {
    fetchItems()
      .then(items => {
        setState({
          isLoaded: true,
          items,
        });
      })
      .catch(error =>
        setState({
          isLoaded: true,
          error,
        })
      );
  }, []);

  return (
    <>
      <main>
        {!isLoaded ? (
          <Spinner />
        ) : (
          <>
            <div className="posters">
              {items.map(item => (
                <Poster key={item.id} {...item} />
              ))}
            </div>
            <Button className="align-self-center">Get more content</Button>
          </>
        )}
      </main>
    </>
  );
}

export default Content;
