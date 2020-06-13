import { createStore, combineReducers } from 'redux';
import content from '../../content';
import auth from '../../authentication';

const store = createStore(
  combineReducers({ content: content.contentReducer, auth: auth.authReducer }),
  window.__REDUX_DEVTOOLS_EXTENSION__ &&
    window.__REDUX_DEVTOOLS_EXTENSION__({ trace: true, traceLimit: 25 })
);

store.subscribe(() => {
  store.getState().content.favorites &&
    localStorage.setItem('favorites', JSON.stringify(store.getState().content.favorites));
});

export default store;
