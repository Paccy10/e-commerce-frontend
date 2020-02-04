import * as actionTypes from '../actions/types';
import { updateObject } from '../utils';

const initialState = {
  status: null,
  message: null,
  cart: null,
  loading: false
};

export default function(state = initialState, action) {
  const { type, payload } = action;
  switch (type) {
    case actionTypes.FETCH_CART_START:
    case actionTypes.ADD_ITEM_TO_CART_START:
    case actionTypes.REMOVE_ITEM_FROM_CART_START:
      return updateObject(state, { loading: true });

    case actionTypes.FETCH_CART_SUCCESS:
      return updateObject(state, {
        status: payload.status,
        message: payload.message,
        cart: payload.cart,
        loading: false
      });

    case actionTypes.FETCH_CART_FAIL:
    case actionTypes.ADD_ITEM_TO_CART_SUCCESS:
    case actionTypes.ADD_ITEM_TO_CART_FAIL:
    case actionTypes.REMOVE_ITEM_FROM_CART_SUCCESS:
    case actionTypes.REMOVE_ITEM_FROM_CART_FAIL:
      return updateObject(state, {
        status: payload.status,
        message: payload.message,
        loading: false
      });

    case actionTypes.LOGOUT:
      return initialState;

    default:
      return state;
  }
}
