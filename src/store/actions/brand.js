import axios from 'axios';
import * as actionTypes from './types';

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
