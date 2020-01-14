import * as actionTypes from '../actions/types';
import { updateObject } from '../utils';

const initialState = {
  status: null,
  message: null,
  token: null,
  user: null,
  loading: false
};

export default function(state = initialState, action) {
  const { type, payload } = action;
  switch (type) {
    case actionTypes.SIGNUP_START:
    case actionTypes.ACTIVATE_START:
      return updateObject(state, {
        status: null,
        message: null,
        loading: true
      });

    case actionTypes.SIGNUP_SUCCESS:
    case actionTypes.SIGNUP_FAIL:
    case actionTypes.ACTIVATE_SUCCESS:
    case actionTypes.ACTIVATE_FAIL:
      return updateObject(state, {
        status: payload.status,
        message: payload.message,
        loading: false
      });

    default:
      return state;
  }
}
