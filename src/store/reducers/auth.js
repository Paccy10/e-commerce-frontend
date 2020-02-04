import * as actionTypes from '../actions/types';
import { updateObject } from '../utils';

const initialState = {
  status: null,
  message: null,
  token: null,
  user: null,
  loading: false,
  authRedirectPath: '/'
};

export default function(state = initialState, action) {
  const { type, payload } = action;
  switch (type) {
    case actionTypes.SIGNUP_START:
    case actionTypes.ACTIVATE_START:
    case actionTypes.REQUEST_RESET_LINK_START:
    case actionTypes.RESET_PASSWORD_START:
      return updateObject(state, {
        status: null,
        message: null,
        loading: true
      });

    case actionTypes.SIGNUP_SUCCESS:
    case actionTypes.SIGNUP_FAIL:
    case actionTypes.ACTIVATE_SUCCESS:
    case actionTypes.ACTIVATE_FAIL:
    case actionTypes.LOGIN_FAIL:
    case actionTypes.REQUEST_RESET_LINK_SUCCESS:
    case actionTypes.REQUEST_RESET_LINK_FAIL:
    case actionTypes.RESET_PASSWORD_SUCCESS:
    case actionTypes.RESET_PASSWORD_FAIL:
      return updateObject(state, {
        status: payload.status,
        message: payload.message,
        loading: false
      });

    case actionTypes.LOGIN_START:
      return updateObject(state, {
        ...initialState,
        loading: true
      });

    case actionTypes.LOGIN_SUCCESS:
      return updateObject(state, {
        status: payload.status,
        message: payload.message,
        token: payload.token,
        user: payload.user,
        loading: false
      });

    case actionTypes.LOGOUT:
      return updateObject(state, {
        ...initialState
      });

    case actionTypes.SET_AUTH_REDIRECT_PATH:
      return updateObject(state, { authRedirectPath: payload.path });

    default:
      return state;
  }
}
