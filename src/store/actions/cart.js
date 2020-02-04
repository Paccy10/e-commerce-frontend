import axios from 'axios';
import * as actionTypes from './types';
import * as actions from '.';
import setAuthToken from '../../utils/setAuthToken';

export const fetchCartStart = () => ({
  type: actionTypes.FETCH_CART_START
});

export const fetchCartFail = (status, message) => ({
  type: actionTypes.FETCH_CART_FAIL,
  payload: {
    status,
    message
  }
});

export const fetchCartSuccess = (status, message, cart) => ({
  type: actionTypes.FETCH_CART_SUCCESS,
  payload: {
    status,
    message,
    cart
  }
});

export const fetchCart = token => {
  return dispatch => {
    setAuthToken(token);
    dispatch(fetchCartStart());
    return axios
      .get('/auth/cart')
      .then(response => {
        dispatch(
          fetchCartSuccess(
            response.data.status,
            response.data.message,
            response.data.data.cart
          )
        );
      })
      .catch(error => {
        dispatch(
          fetchCartFail(error.response.data.status, error.response.data.message)
        );
      });
  };
};

export const addItemToCartStart = () => ({
  type: actionTypes.ADD_ITEM_TO_CART_START
});

export const addItemToCartFail = (status, message) => ({
  type: actionTypes.ADD_ITEM_TO_CART_FAIL,
  payload: {
    status,
    message
  }
});

export const addItemToCartSuccess = (status, message) => ({
  type: actionTypes.ADD_ITEM_TO_CART_SUCCESS,
  payload: {
    status,
    message
  }
});

export const addItemToCart = (token, body) => {
  return dispatch => {
    setAuthToken(token);
    dispatch(addItemToCartStart());
    return axios
      .post('/auth/cart', body)
      .then(response => {
        dispatch(
          addItemToCartSuccess(response.data.status, response.data.message)
        );
        dispatch(actions.setAlert(response.data.message, 'Success'));
      })
      .catch(error => {
        dispatch(
          addItemToCartFail(
            error.response.data.status,
            error.response.data.message
          )
        );
        dispatch(actions.setAlert(error.response.data.message, 'Danger'));
      });
  };
};

export const removeItemFromCartStart = () => ({
  type: actionTypes.REMOVE_ITEM_FROM_CART_START
});

export const removeItemFromCartFail = (status, message) => ({
  type: actionTypes.REMOVE_ITEM_FROM_CART_FAIL,
  payload: {
    status,
    message
  }
});

export const removeItemzFromCartSuccess = (status, message) => ({
  type: actionTypes.REMOVE_ITEM_FROM_CART_SUCCESS,
  payload: {
    status,
    message
  }
});

export const removeItemFromCart = (token, cartId) => {
  return dispatch => {
    setAuthToken(token);
    dispatch(removeItemFromCartStart());
    return axios
      .delete(`/auth/cart/items/${cartId}`)
      .then(response => {
        dispatch(
          removeItemzFromCartSuccess(
            response.data.status,
            response.data.message
          )
        );
        dispatch(actions.setAlert(response.data.message, 'Success'));
        dispatch(fetchCart(token));
      })
      .catch(error => {
        dispatch(
          removeItemFromCartFail(
            error.response.data.status,
            error.response.data.message
          )
        );
        dispatch(actions.setAlert(error.response.data.message, 'Danger'));
        dispatch(fetchCart(token));
      });
  };
};
