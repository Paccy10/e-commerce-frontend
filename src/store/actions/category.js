import axios from 'axios';
import * as actionTypes from './types';
import * as actions from '.';
import setAuthToken from '../../utils/setAuthToken';

export const fetchCategoriesStart = () => ({
  type: actionTypes.FETCH_CATEGORIES_START
});

export const fetchCategoriesFail = (status, message) => ({
  type: actionTypes.FETCH_CATEGORIES_FAIL,
  payload: {
    status,
    message
  }
});

export const fetchCategoriesSuccess = (status, message, categories) => ({
  type: actionTypes.FETCH_CATEGORIES_SUCCESS,
  payload: {
    status,
    message,
    categories
  }
});

export const fetchCategories = () => {
  return dispatch => {
    dispatch(fetchCategoriesStart());
    return axios
      .get('/categories')
      .then(response => {
        dispatch(
          fetchCategoriesSuccess(
            response.data.status,
            response.data.message,
            response.data.data.categories
          )
        );
      })
      .catch(() => {
        dispatch(fetchCategoriesFail());
      });
  };
};

export const deleteCategoryStart = () => ({
  type: actionTypes.DELETE_CATEGORY_START
});

export const deleteCategorySuccess = (status, message) => ({
  type: actionTypes.DELETE_CATEGORY_SUCCESS,
  payload: {
    status,
    message
  }
});

export const deleteCategoryFail = (status, message) => ({
  type: actionTypes.DELETE_CATEGORY_FAIL,
  payload: {
    status,
    message
  }
});

export const deleteCategory = (categoryId, token) => {
  return dispatch => {
    setAuthToken(token);
    dispatch(deleteCategoryStart());
    return axios
      .delete(`/categories/${categoryId}`)
      .then(response => {
        dispatch(
          deleteCategorySuccess(response.data.status, response.data.message)
        );
        dispatch(fetchCategories());
        dispatch(actions.setAlert(response.data.message, 'Success'));
      })
      .catch(error => {
        dispatch(
          deleteCategoryFail(
            error.response.data.status,
            error.response.data.message
          )
        );
        dispatch(actions.setAlert(error.response.data.message, 'Danger'));
        dispatch(fetchCategories());
      });
  };
};

export const fetchCategoryStart = () => ({
  type: actionTypes.FETCH_CATEGORY_START
});

export const fetchCategorySuccess = (status, message, category) => ({
  type: actionTypes.FETCH_CATEGORY_SUCCESS,
  payload: {
    status,
    message,
    category
  }
});

export const fetchCategoryFail = (status, message) => ({
  type: actionTypes.FETCH_CATEGORY_FAIL,
  payload: {
    status,
    message
  }
});

export const fetchCategory = categoryId => {
  return dispatch => {
    dispatch(fetchCategoryStart());
    return axios
      .get(`/categories/${categoryId}`)
      .then(response => {
        dispatch(
          fetchCategorySuccess(
            response.data.status,
            response.data.message,
            response.data.data.category
          )
        );
      })
      .catch(error => {
        dispatch(
          fetchCategoryFail(
            error.response.data.status,
            error.response.data.message
          )
        );
        dispatch(actions.setAlert(error.response.data.message, 'Danger'));
      });
  };
};

export const createCategoryStart = () => ({
  type: actionTypes.CREATE_CATEGORY_START
});

export const createCategorySuccess = (status, message) => ({
  type: actionTypes.CREATE_CATEGORY_SUCCESS,
  payload: {
    status,
    message
  }
});

export const createCategoryFail = (status, message) => ({
  type: actionTypes.CREATE_CATEGORY_FAIL,
  payload: {
    status,
    message
  }
});

export const createCategory = (token, FormData) => {
  return dispatch => {
    setAuthToken(token);
    dispatch(createCategoryStart());

    return axios
      .post('/categories', FormData)
      .then(response => {
        dispatch(
          createCategorySuccess(response.data.status, response.data.message)
        );
        dispatch(actions.setAlert(response.data.message, 'Success'));
      })
      .catch(error => {
        dispatch(
          createCategoryFail(
            error.response.data.status,
            error.response.data.message
          )
        );
        dispatch(actions.setAlert(error.response.data.message, 'Danger'));
      });
  };
};

export const updateCategoryStart = () => ({
  type: actionTypes.UPDATE_CATEGORY_START
});

export const updateCategorySuccess = (status, message) => ({
  type: actionTypes.UPDATE_CATEGORY_SUCCESS,
  payload: {
    status,
    message
  }
});

export const updateCategoryFail = (status, message) => ({
  type: actionTypes.UPDATE_CATEGORY_FAIL,
  payload: {
    status,
    message
  }
});

export const updateCategory = (token, categoryId, FormData) => {
  return dispatch => {
    setAuthToken(token);
    dispatch(updateCategoryStart());
    return axios
      .put(`/categories/${categoryId}`, FormData)
      .then(response => {
        dispatch(
          updateCategorySuccess(response.data.status, response.data.message)
        );
        dispatch(actions.setAlert(response.data.message, 'Success'));
      })
      .catch(error => {
        dispatch(
          updateCategoryFail(
            error.response.data.status,
            error.response.data.message
          )
        );
        dispatch(actions.setAlert(error.response.data.message, 'Danger'));
      });
  };
};
