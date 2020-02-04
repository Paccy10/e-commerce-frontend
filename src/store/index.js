import { createStore, applyMiddleware, compose, combineReducers } from 'redux';
import thunk from 'redux-thunk';
import alert from './reducers/alert';
import auth from './reducers/auth';
import brand from './reducers/brand';
import category from './reducers/category';
import product from './reducers/product';
import cart from './reducers/cart';

const composeEnhancers =
  process.env.NODE_ENV === 'development'
    ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
    : null || compose;

const rootReducer = combineReducers({
  alert,
  auth,
  brand,
  category,
  product,
  cart
});

const store = createStore(
  rootReducer,
  composeEnhancers(applyMiddleware(thunk))
);

export default store;
