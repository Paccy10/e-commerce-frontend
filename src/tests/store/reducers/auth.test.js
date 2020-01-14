import * as actionTypes from '../../../store/actions/types';
import auth from '../../../store/reducers/auth';

describe('Alert reducer', () => {
  const initialState = {
    status: null,
    message: null,
    token: null,
    user: null,
    loading: false
  };
  it('should return new state if action type is SIGNUP_START', () => {
    const newSate = auth(initialState, {
      type: actionTypes.SIGNUP_START
    });
    expect(newSate).toEqual({
      ...initialState,
      loading: true
    });
  });

  it('should return new state if action type is SIGNUP_SUCCESS', () => {
    const payload = {
      status: 'success',
      message: 'User created'
    };
    const newSate = auth(initialState, {
      type: actionTypes.SIGNUP_SUCCESS,
      payload
    });
    expect(newSate).toEqual({
      ...initialState,
      ...payload
    });
  });
});
