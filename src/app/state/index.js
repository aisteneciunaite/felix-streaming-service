import { createStore, combineReducers } from 'redux';
import contentReducer from './content';
import authReducer from './authentication';

const store = createStore(
  combineReducers({ content: contentReducer, auth: authReducer }),
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
);

export default store;
