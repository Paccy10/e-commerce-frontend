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

    case actionTypes.FETCH_BRANDS_FAIL:
      return updateObject(state, {
        status: payload.status,
        message: payload.message,
        loading: false
      });

    default:
      return state;
  }
}
