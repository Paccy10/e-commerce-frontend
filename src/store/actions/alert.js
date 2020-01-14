import * as actionTypes from './types';

export const setAlert = (message, alertType, timeout = 10000) => dispatch => {
  dispatch({
    type: actionTypes.SET_ALERT,
    payload: { message, alertType }
  });

  setTimeout(() => dispatch({ type: actionTypes.REMOVE_ALERT }), timeout);
};

export const removeAlert = () => dispatch => {
  dispatch({ type: actionTypes.REMOVE_ALERT });
};
