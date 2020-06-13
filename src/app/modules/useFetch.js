import { useEffect, useState, useCallback } from 'react';
import { useStore } from 'react-redux';
import content from '../../content';

function useFetch(endpoint, method = 'GET', headers, initPayload, shouldStore = true) {
  const [isLoaded, setIsLoaded] = useState(false);
  const [payload, setPayload] = useState(initPayload);
  const store = useStore();

  const getItems = useCallback(async () => {
    console.log('fetching data');
    try {
      const response = await fetch('https://academy-video-api.herokuapp.com' + endpoint, {
        method,
        headers: {
          'Content-Type': 'application/json',
          ...headers,
        },
      });
      const result = await response.json();
      setPayload(result);
      setIsLoaded(true);
      shouldStore && store.dispatch(content.actions.storeContent(result));
    } catch (error) {
      console.log(error);
    }
  }, [endpoint, method, headers, shouldStore, store]);

  useEffect(() => {
    const shouldUpdate =
      endpoint !== content.selectors.getStoreMoviesSource(store.getState()) && shouldStore;
    if (!initPayload || shouldUpdate) {
      getItems();
    } else setIsLoaded(true);
  }, [getItems, initPayload, endpoint, store, shouldStore]);

  useEffect(() => {
    if (endpoint !== content.selectors.getStoreMoviesSource(store.getState()) && shouldStore) {
      store.dispatch(content.actions.setItemsSource(endpoint));
    }
  }, [endpoint, store, shouldStore]);

  return { isLoaded, payload };
}
export default useFetch;
