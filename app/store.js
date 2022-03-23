import {
  createStore,
  combineReducers,
  applyMiddleware,
  compose
} from 'redux'
import thunk from 'redux-thunk'

import productsReducer from './reducers/products'
import productReducer from './reducers/product'

const composeEnchancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose
const stateInitialized = {
  products: [],
  product: null
}
const store = createStore(
  combineReducers({
    products: productsReducer,
    product: productReducer
  }),
  stateInitialized,
  composeEnchancers(applyMiddleware(thunk))
)

export default store