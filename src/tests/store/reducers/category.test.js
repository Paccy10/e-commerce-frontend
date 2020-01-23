import * as actionTypes from '../../../store/actions/types';
import category from '../../../store/reducers/category';

describe('Category reducer', () => {
  const initialState = {
    status: null,
    message: null,
    categories: [],
    loading: false
  };
  it('should return new state if action type is FETCH_CATEGORIES_START', () => {
    const newSate = category(initialState, {
      type: actionTypes.FETCH_CATEGORIES_START
    });
    expect(newSate).toEqual({ ...initialState, loading: true });
  });

  it('should return new state if action type is FETCH_CATEGORIES_SUCCESS', () => {
    const payload = {
      status: 'success',
      message: 'categories fetched',
      categories: []
    };
    const newSate = category(initialState, {
      type: actionTypes.FETCH_CATEGORIES_SUCCESS,
      payload
    });
    expect(newSate).toEqual({ ...initialState, ...payload });
  });

  it('should return new state if action type is FETCH_CATEGORY_SUCCESS', () => {
    const payload = {
      status: 'success',
      message: 'category fetched',
      category: {}
    };
    const newSate = category(initialState, {
      type: actionTypes.FETCH_CATEGORY_SUCCESS,
      payload
    });
    expect(newSate).toEqual({
      ...initialState,
      status: payload.status,
      message: payload.message,
      categories: [payload.category]
    });
  });

  it('should return new state if action type is FETCH_CATEGORIES_FAIL', () => {
    const payload = {
      status: 'error',
      message: 'categories not fetched'
    };
    const newSate = category(initialState, {
      type: actionTypes.FETCH_CATEGORIES_FAIL,
      payload
    });
    expect(newSate).toEqual({ ...initialState, ...payload });
  });
});
