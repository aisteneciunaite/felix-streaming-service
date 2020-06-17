import { useEffect, useState, useCallback } from 'react';
import { useStore } from 'react-redux';
import content from '../../content';

function useFetch(endpoint, method = 'GET', headers, initPayload, shouldStore = true) {
  //initial state
  const [isLoaded, setIsLoaded] = useState(false);
  const [payload, setPayload] = useState(initPayload);
  const store = useStore();

  const getItems = useCallback(async () => {
    console.log('fetching data');
    // gets data from API
    try {
      const response = await fetch('https://academy-video-api.herokuapp.com' + endpoint, {
        method,
        headers: {
          'Content-Type': 'application/json',
          ...headers,
        },
      });
      const result = await response.json();
      // stores data to local state
      setPayload(result);
      setIsLoaded(true);

      //reset error if exists
      content.selectors.getContentError(store.getState()) &&
        store.dispatch(content.actions.setContentError(null));
      shouldStore && store.dispatch(content.actions.storeContent(result));
    } catch (error) {
      store.dispatch(content.actions.setContentError(error));
      console.log(error);
    }
  }, [endpoint, method, headers, shouldStore, store]);

  const shouldUpdate = useCallback(
    //check if curent endpint is different from store endpoint
    () => endpoint !== content.selectors.getStoreMoviesSource(store.getState()),
    [endpoint, store]
  );

  useEffect(() => {
    // check if needs to be fetched
    if (!initPayload || (shouldStore && shouldUpdate())) {
      getItems();
    } else setIsLoaded(true);
  }, [getItems, initPayload, shouldUpdate, shouldStore]);

  useEffect(() => {
    if (shouldStore && shouldUpdate()) {
      store.dispatch(content.actions.setItemsSource(endpoint));
    }
  }, [endpoint, store, shouldUpdate, shouldStore]);

  return { isLoaded, payload };
}
export default useFetch;
