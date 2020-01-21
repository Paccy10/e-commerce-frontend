import * as actionTypes from '../actions/types';
import { updateObject } from '../utils';

const initialState = {
  status: null,
  message: null,
  brands: [],
  loading: false
};

export default function(state = initialState, action) {
  const { type, payload } = action;
  switch (type) {
    case actionTypes.FETCH_BRANDS_START:
    case actionTypes.DELETE_BRAND_START:
    case actionTypes.CREATE_BRAND_START:
    case actionTypes.FETCH_BRAND_START:
    case actionTypes.UPDATE_BRAND_START:
      return updateObject(state, {
        ...initialState,
        loading: true
      });

    case actionTypes.FETCH_BRANDS_SUCCESS:
      return updateObject(state, {
        status: payload.status,
        message: payload.message,
        brands: payload.brands,
        loading: false
      });

    case actionTypes.FETCH_BRAND_SUCCESS:
      return updateObject(state, {
        status: payload.status,
        message: payload.message,
        brands: state.brands.concat(payload.brand),
        loading: false
      });

    case actionTypes.FETCH_BRANDS_FAIL:
    case actionTypes.DELETE_BRAND_SUCCESS:
    case actionTypes.DELETE_BRAND_FAIL:
    case actionTypes.CREATE_BRAND_SUCCESS:
    case actionTypes.CREATE_BRAND_FAIL:
    case actionTypes.FETCH_BRAND_FAIL:
    case actionTypes.UPDATE_BRAND_SUCCESS:
    case actionTypes.UPDATE_BRAND_FAIL:
      return updateObject(state, {
        status: payload.status,
        message: payload.message,
        loading: false
      });

    default:
      return state;
  }
}
