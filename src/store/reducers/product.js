import * as actionTypes from '../actions/types';
import { updateObject } from '../utils';

const initialState = {
  status: null,
  message: null,
  products: [],
  loading: false
};

export default function(state = initialState, action) {
  const { type, payload } = action;
  switch (type) {
    case actionTypes.FETCH_PRODUCTS_START:
    case actionTypes.CREATE_PRODUCT_START:
    case actionTypes.FETCH_PRODUCT_START:
    case actionTypes.DELETE_PRODUCT_START:
    case actionTypes.UPDATE_PRODUCT_START:
      return updateObject(state, {
        ...initialState,
        loading: true
      });

    case actionTypes.FETCH_PRODUCTS_SUCCESS:
      return updateObject(state, {
        status: payload.status,
        message: payload.message,
        products: payload.products,
        loading: false
      });

    case actionTypes.FETCH_PRODUCT_SUCCESS:
      return updateObject(state, {
        status: payload.status,
        message: payload.message,
        products: state.products.concat(payload.product),
        loading: false
      });

    case actionTypes.FETCH_PRODUCTS_FAIL:
    case actionTypes.CREATE_PRODUCT_SUCCESS:
    case actionTypes.CREATE_PRODUCT_FAIL:
    case actionTypes.FETCH_PRODUCT_FAIL:
    case actionTypes.DELETE_PRODUCT_SUCCESS:
    case actionTypes.DELETE_PRODUCT_FAIL:
    case actionTypes.UPDATE_PRODUCT_SUCCESS:
    case actionTypes.UPDATE_PRODUCT_FAIL:
      return updateObject(state, {
        status: payload.status,
        message: payload.message,
        loading: false
      });

    default:
      return state;
  }
}
