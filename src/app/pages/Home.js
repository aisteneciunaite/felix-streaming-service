import React, { useState, useEffect, useCallback } from 'react';

import Button from '../components/Button';
import Hero from '../components/Hero';
import Card from '../components/Card';
import Spinner from '../components/Spinner';
import heroImage from '../images/cinema.jpg';

import { fetchFreeItems } from '../modules/api';

function Home({ favorites, setFavorites }) {
  const [state, setState] = useState({
    error: null,
    isLoaded: false,
    items: [],
  });

  const getItems = useCallback(async () => {
    try {
      const result = await fetchFreeItems();
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

  const mapFavorites = useCallback(() => {
    setState(prevState => {
      return {
        isLoaded: true,
        items: prevState.items.map(item => {
          item.isFavorite = favorites.includes(item.id);
          return item;
        }),
      };
    });
  }, [favorites]);

  useEffect(() => {
    mapFavorites();
  }, [mapFavorites]);

  useEffect(() => {
    getItems();
  }, [getItems]);

  const { isLoaded, items } = state;

  return (
    <>
      <Hero title="Wanna more Content ?" background={heroImage}>
        <Button onClick={() => setState({ ...state, isLoaded: !isLoaded })}>Get Access</Button>
      </Hero>

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

export default Home;
