import axios from 'axios';
import * as actionTypes from './types';
import * as actions from '.';

export const signupStart = () => ({
  type: actionTypes.SIGNUP_START
});

export const signupSuccess = (status, message) => ({
  type: actionTypes.SIGNUP_SUCCESS,
  payload: {
    status,
    message
  }
});

export const signupFail = (status, message) => ({
  type: actionTypes.SIGNUP_FAIL,
  payload: {
    status,
    message
  }
});

export const signup = formData => {
  return dispatch => {
    dispatch(signupStart());
    return axios
      .post('/auth/signup', formData)
      .then(response => {
        dispatch(signupSuccess(response.data.status, response.data.message));
        dispatch(actions.setAlert(response.data.message, 'Success'));
      })
      .catch(error => {
        dispatch(
          signupFail(error.response.data.status, error.response.data.message)
        );
        dispatch(actions.setAlert(error.response.data.message, 'Danger'));
      });
  };
};

export const activateStart = () => ({
  type: actionTypes.ACTIVATE_START
});

export const activateSuccess = (status, message) => ({
  type: actionTypes.ACTIVATE_SUCCESS,
  payload: {
    status,
    message
  }
});

export const activateFail = (status, message) => ({
  type: actionTypes.ACTIVATE_FAIL,
  payload: {
    status,
    message
  }
});

export const activate = token => {
  return dispatch => {
    dispatch(activateStart());
    return axios
      .get(`/auth/activate/${token}`)
      .then(response => {
        dispatch(activateSuccess(response.data.status, response.data.message));
        dispatch(actions.setAlert(response.data.message, 'Success'));
      })
      .catch(error => {
        dispatch(
          activateFail(error.response.data.status, error.response.data.message)
        );
        dispatch(actions.setAlert(error.response.data.message, 'Warning'));
      });
  };
};
