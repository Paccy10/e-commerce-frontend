import axios from 'axios';
import * as actionTypes from './types';
import * as actions from '.';
import setAuthToken from '../../utils/setAuthToken';

export const fetchBrandsStart = () => ({
  type: actionTypes.FETCH_BRANDS_START
});

export const fetchBrandsFail = (status, message) => ({
  type: actionTypes.FETCH_BRANDS_FAIL,
  payload: {
    status,
    message
  }
});

export const fetchBrandsSuccess = (status, message, brands) => ({
  type: actionTypes.FETCH_BRANDS_SUCCESS,
  payload: {
    status,
    message,
    brands
  }
});

export const fetchBrands = () => {
  return dispatch => {
    dispatch(fetchBrandsStart());
    return axios
      .get('/brands')
      .then(response => {
        dispatch(
          fetchBrandsSuccess(
            response.data.status,
            response.data.message,
            response.data.data.brands
          )
        );
      })
      .catch(() => {
        dispatch(fetchBrandsFail());
      });
  };
};

export const deleteBrandStart = () => ({
  type: actionTypes.DELETE_BRAND_START
});

export const deleteBrandSuccess = (status, message) => ({
  type: actionTypes.DELETE_BRAND_SUCCESS,
  payload: {
    status,
    message
  }
});

export const deleteBrandFail = (status, message) => ({
  type: actionTypes.DELETE_BRAND_FAIL,
  payload: {
    status,
    message
  }
});

export const deleteBrand = (brandId, token) => {
  return dispatch => {
    setAuthToken(token);
    dispatch(deleteBrandStart());
    return axios
      .delete(`/brands/${brandId}`)
      .then(response => {
        dispatch(
          deleteBrandSuccess(response.data.status, response.data.message)
        );
        dispatch(fetchBrands());
        dispatch(actions.setAlert(response.data.message, 'Success'));
      })
      .catch(error => {
        dispatch(
          deleteBrandFail(
            error.response.data.status,
            error.response.data.message
          )
        );
        dispatch(actions.setAlert(error.response.data.message, 'Danger'));
        dispatch(fetchBrands());
      });
  };
};

export const createBrandStart = () => ({
  type: actionTypes.CREATE_BRAND_START
});

export const createBrandSuccess = (status, message) => ({
  type: actionTypes.CREATE_BRAND_SUCCESS,
  payload: {
    status,
    message
  }
});

export const createBrandFail = (status, message) => ({
  type: actionTypes.CREATE_BRAND_FAIL,
  payload: {
    status,
    message
  }
});

export const createBrand = (token, FormData) => {
  return dispatch => {
    setAuthToken(token);
    dispatch(createBrandStart());

    return axios
      .post('/brands', FormData)
      .then(response => {
        dispatch(
          createBrandSuccess(response.data.status, response.data.message)
        );
        dispatch(actions.setAlert(response.data.message, 'Success'));
      })
      .catch(error => {
        dispatch(
          createBrandFail(
            error.response.data.status,
            error.response.data.message
          )
        );
        dispatch(actions.setAlert(error.response.data.message, 'Danger'));
      });
  };
};

export const fetchBrandStart = () => ({
  type: actionTypes.FETCH_BRAND_START
});

export const fetchBrandSuccess = (status, message, brand) => ({
  type: actionTypes.FETCH_BRAND_SUCCESS,
  payload: {
    status,
    message,
    brand
  }
});

export const fetchBrandFail = (status, message) => ({
  type: actionTypes.FETCH_BRAND_FAIL,
  payload: {
    status,
    message
  }
});

export const fetchBrand = brandId => {
  return dispatch => {
    dispatch(fetchBrandStart());
    return axios
      .get(`/brands/${brandId}`)
      .then(response => {
        dispatch(
          fetchBrandSuccess(
            response.data.status,
            response.data.message,
            response.data.data.brand
          )
        );
      })
      .catch(error => {
        dispatch(
          fetchBrandFail(
            error.response.data.status,
            error.response.data.message
          )
        );
        dispatch(actions.setAlert(error.response.data.message, 'Danger'));
      });
  };
};

export const updateBrandStart = () => ({
  type: actionTypes.UPDATE_BRAND_START
});

export const updateBrandSuccess = (status, message) => ({
  type: actionTypes.UPDATE_BRAND_SUCCESS,
  payload: {
    status,
    message
  }
});

export const updateBrandFail = (status, message) => ({
  type: actionTypes.UPDATE_BRAND_FAIL,
  payload: {
    status,
    message
  }
});

export const updateBrand = (token, brandId, FormData) => {
  return dispatch => {
    setAuthToken(token);
    dispatch(updateBrandStart());
    return axios
      .put(`/brands/${brandId}`, FormData)
      .then(response => {
        dispatch(
          updateBrandSuccess(response.data.status, response.data.message)
        );
        dispatch(actions.setAlert(response.data.message, 'Success'));
      })
      .catch(error => {
        dispatch(
          updateBrandFail(
            error.response.data.status,
            error.response.data.message
          )
        );
        dispatch(actions.setAlert(error.response.data.message, 'Danger'));
      });
  };
};
