import React, { useState, useEffect, useCallback } from 'react';

import Button from '../components/Button';
import Card from '../components/Card';
import Spinner from '../components/Spinner';

import { fetchItems } from '../modules/api';

function Content({ favorites, setFavorites }) {
  const [state, setState] = useState({
    isLoaded: false,
    items: [],
  });
  const { isLoaded, items } = state;

  const getItems = useCallback(async () => {
    try {
      const result = await fetchItems();
      setState({
        isLoaded: true,
        items: result.map(item => {
          item.isFavorite = favorites.includes(item.id);
          return item;
        }),
      });
    } catch (error) {
      console.log(error);
    }
  }, [favorites]);

  useEffect(() => {
    getItems();
  }, [getItems]);

  return (
    <>
      <main>
        {!isLoaded ? (
          <Spinner />
        ) : (
          <>
            <div className="posters">
              {items.map(item => (
                <Card key={item.id} setFavorites={setFavorites} {...item} />
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
