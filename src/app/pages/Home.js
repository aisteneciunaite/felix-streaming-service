import React, { useState, useEffect, useCallback } from 'react';

import Button from '../components/Button';
import Hero from '../components/Hero';
import Card from '../components/Card';
import Spinner from '../components/Spinner';
import heroImage from '../images/cinema.jpg';

import { fetchFreeItems } from '../modules/api';

function Home() {
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
        items: result,
      });
    } catch (error) {
      console.log(error);
    }
  }, []);

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
                <Card key={item.id} {...item} />
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
