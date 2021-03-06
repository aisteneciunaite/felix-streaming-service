import { createStore, combineReducers, applyMiddleware } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';

import middleware from './middleware';
import content from '../../content';
import auth from '../../authentication';

const composeEnhancers = composeWithDevTools({
  trace: true,
  traceLimit: 25,
});

const allMiddleware =
  process.env.NODE_ENV === 'development' && window.__REDUX_DEVTOOLS_EXTENSION__
    ? composeEnhancers(applyMiddleware(...middleware))
    : applyMiddleware(...middleware);

const store = createStore(
  combineReducers({ content: content.contentReducer, auth: auth.authReducer }),
  allMiddleware
);

store.subscribe(() => {
  store.getState().content.favorites &&
    localStorage.setItem('favorites', JSON.stringify(store.getState().content.favorites));
  console.log('favorites saved to local storage');
});

export default store;
