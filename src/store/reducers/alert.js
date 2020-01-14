import * as actionTypes from '../actions/types';
import { updateObject } from '../utils';

const initialState = {
  message: null,
  alertType: null
};

export default function(state = initialState, action) {
  const { type, payload } = action;
  switch (type) {
    case actionTypes.SET_ALERT:
      return updateObject(state, payload);

    case actionTypes.REMOVE_ALERT:
      return initialState;

    default:
      return state;
  }
}
