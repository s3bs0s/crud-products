import {
  createStore,
  combineReducers,
  applyMiddleware,
  compose
} from 'redux';
import thunk from 'redux-thunk';

import productReducer from './reducers/product';

const composeEnchancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const stateInitialized = {
  products: []
}
const store = createStore(
  combineReducers({
    products: productReducer
  }),
  stateInitialized,
  composeEnchancers(applyMiddleware(thunk))
);

export default store;