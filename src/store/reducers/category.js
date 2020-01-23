import * as actionTypes from '../actions/types';
import { updateObject } from '../utils';

const initialState = {
  status: null,
  message: null,
  categories: [],
  loading: false
};

export default function(state = initialState, action) {
  const { type, payload } = action;
  switch (type) {
    case actionTypes.FETCH_CATEGORIES_START:
    case actionTypes.DELETE_CATEGORY_START:
    case actionTypes.FETCH_CATEGORY_START:
    case actionTypes.CREATE_CATEGORY_START:
    case actionTypes.UPDATE_CATEGORY_START:
      return updateObject(state, {
        ...initialState,
        loading: true
      });

    case actionTypes.FETCH_CATEGORIES_SUCCESS:
      return updateObject(state, {
        status: payload.status,
        message: payload.message,
        categories: payload.categories,
        loading: false
      });

    case actionTypes.FETCH_CATEGORY_SUCCESS:
      return updateObject(state, {
        status: payload.status,
        message: payload.message,
        categories: state.categories.concat(payload.category),
        loading: false
      });

    case actionTypes.FETCH_CATEGORIES_FAIL:
    case actionTypes.DELETE_CATEGORY_SUCCESS:
    case actionTypes.DELETE_CATEGORY_FAIL:
    case actionTypes.FETCH_CATEGORY_FAIL:
    case actionTypes.CREATE_CATEGORY_SUCCESS:
    case actionTypes.CREATE_CATEGORY_FAIL:
    case actionTypes.UPDATE_CATEGORY_SUCCESS:
    case actionTypes.UPDATE_CATEGORY_FAIL:
      return updateObject(state, {
        status: payload.status,
        message: payload.message,
        loading: false
      });

    default:
      return state;
  }
}
