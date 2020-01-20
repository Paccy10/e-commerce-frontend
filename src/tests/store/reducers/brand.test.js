import * as actionTypes from '../../../store/actions/types';
import brand from '../../../store/reducers/brand';

describe('Brand reducer', () => {
  const initialState = {
    status: null,
    message: null,
    brands: [],
    loading: false
  };
  it('should return new state if action type is FETCH_BRANDS_START', () => {
    const newSate = brand(initialState, {
      type: actionTypes.FETCH_BRANDS_START
    });
    expect(newSate).toEqual({ ...initialState, loading: true });
  });

  it('should return new state if action type is FETCH_BRANDS_SUCCESS', () => {
    const payload = {
      status: 'success',
      message: 'brands fetched',
      brands: []
    };
    const newSate = brand(initialState, {
      type: actionTypes.FETCH_BRANDS_SUCCESS,
      payload
    });
    expect(newSate).toEqual({ ...initialState, ...payload });
  });

  it('should return new state if action type is FETCH_BRANDS_FAIL', () => {
    const payload = {
      status: 'error',
      message: 'brands not fetched'
    };
    const newSate = brand(initialState, {
      type: actionTypes.FETCH_BRANDS_FAIL,
      payload
    });
    expect(newSate).toEqual({ ...initialState, ...payload });
  });
});
