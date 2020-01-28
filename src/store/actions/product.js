import axios from 'axios';
import * as actionTypes from './types';
import * as actions from '.';
import setAuthToken from '../../utils/setAuthToken';

export const fetchProductsStart = () => ({
  type: actionTypes.FETCH_PRODUCTS_START
});

export const fetchProductsFail = (status, message) => ({
  type: actionTypes.FETCH_PRODUCTS_FAIL,
  payload: {
    status,
    message
  }
});

export const fetchProductsSuccess = (status, message, products) => ({
  type: actionTypes.FETCH_PRODUCTS_SUCCESS,
  payload: {
    status,
    message,
    products
  }
});

export const fetchProducts = () => {
  return dispatch => {
    dispatch(fetchProductsStart());
    return axios
      .get('/products')
      .then(response => {
        dispatch(
          fetchProductsSuccess(
            response.data.status,
            response.data.message,
            response.data.data.products
          )
        );
      })
      .catch(() => {
        dispatch(fetchProductsFail());
      });
  };
};

export const createProductStart = () => ({
  type: actionTypes.CREATE_PRODUCT_START
});

export const createProductSuccess = (status, message) => ({
  type: actionTypes.CREATE_PRODUCT_SUCCESS,
  payload: {
    status,
    message
  }
});

export const createProductFail = (status, message) => ({
  type: actionTypes.CREATE_PRODUCT_FAIL,
  payload: {
    status,
    message
  }
});

export const createProduct = (token, FormData) => {
  return dispatch => {
    setAuthToken(token);

    return axios
      .post('/products', FormData, {
        headers: {
          'Content-Type': 'application/json'
        }
      })
      .then(response => {
        dispatch(
          createProductSuccess(response.data.status, response.data.message)
        );
        dispatch(actions.setAlert(response.data.message, 'Success'));
      })
      .catch(error => {
        dispatch(
          createProductFail(
            error.response.data.status,
            error.response.data.message
          )
        );
        dispatch(actions.setAlert(error.response.data.message, 'Danger'));
      });
  };
};

export const fetchProductStart = () => ({
  type: actionTypes.FETCH_PRODUCT_START
});

export const fetchProductSuccess = (status, message, product) => ({
  type: actionTypes.FETCH_PRODUCT_SUCCESS,
  payload: {
    status,
    message,
    product
  }
});

export const fetchProductFail = (status, message) => ({
  type: actionTypes.FETCH_PRODUCT_FAIL,
  payload: {
    status,
    message
  }
});

export const fetchProduct = productId => {
  return dispatch => {
    dispatch(fetchProductStart());
    return axios
      .get(`/products/${productId}`)
      .then(response => {
        dispatch(
          fetchProductSuccess(
            response.data.status,
            response.data.message,
            response.data.data.product
          )
        );
      })
      .catch(error => {
        dispatch(
          fetchProductFail(
            error.response.data.status,
            error.response.data.message
          )
        );
        dispatch(actions.setAlert(error.response.data.message, 'Danger'));
      });
  };
};

export const deleteProductStart = () => ({
  type: actionTypes.DELETE_PRODUCT_START
});

export const deleteProductSuccess = (status, message) => ({
  type: actionTypes.DELETE_PRODUCT_SUCCESS,
  payload: {
    status,
    message
  }
});

export const deleteProductFail = (status, message) => ({
  type: actionTypes.DELETE_PRODUCT_FAIL,
  payload: {
    status,
    message
  }
});

export const deleteProduct = (productId, token) => {
  return dispatch => {
    setAuthToken(token);
    dispatch(deleteProductStart());
    return axios
      .delete(`/products/${productId}`)
      .then(response => {
        dispatch(
          deleteProductSuccess(response.data.status, response.data.message)
        );
        dispatch(actions.setAlert(response.data.message, 'Success'));
      })
      .catch(error => {
        dispatch(
          deleteProductFail(
            error.response.data.status,
            error.response.data.message
          )
        );
        dispatch(actions.setAlert(error.response.data.message, 'Danger'));
      });
  };
};

export const updateProductStart = () => ({
  type: actionTypes.UPDATE_PRODUCT_START
});

export const updateProductSuccess = (status, message) => ({
  type: actionTypes.UPDATE_PRODUCT_SUCCESS,
  payload: {
    status,
    message
  }
});

export const updateProductFail = (status, message) => ({
  type: actionTypes.UPDATE_PRODUCT_FAIL,
  payload: {
    status,
    message
  }
});

export const updateProduct = (token, productId, FormData) => {
  return dispatch => {
    setAuthToken(token);
    return axios
      .put(`/products/${productId}`, FormData)
      .then(response => {
        dispatch(
          updateProductSuccess(response.data.status, response.data.message)
        );
        dispatch(actions.setAlert(response.data.message, 'Success'));
      })
      .catch(error => {
        dispatch(
          updateProductFail(
            error.response.data.status,
            error.response.data.message
          )
        );
        dispatch(actions.setAlert(error.response.data.message, 'Danger'));
      });
  };
};
