import * as actionTypes from '../../../store/actions/types';
import auth from '../../../store/reducers/auth';

describe('Alert reducer', () => {
  const initialState = {
    status: null,
    message: null,
    token: null,
    user: null,
    loading: false,
    authRedirectPath: '/'
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

  it('should return new state if action type is LOGIN_START', () => {
    const newSate = auth(initialState, {
      type: actionTypes.LOGIN_START
    });
    expect(newSate).toEqual({
      ...initialState,
      loading: true
    });
  });

  it('should return new state if action type is LOGIN_SUCCESS', () => {
    const payload = {
      status: 'success',
      message: 'User logged in',
      token: 'token',
      user: {}
    };
    const newSate = auth(initialState, {
      type: actionTypes.LOGIN_SUCCESS,
      payload
    });
    expect(newSate).toEqual({
      ...initialState,
      ...payload
    });
  });

  it('should return new state if action type is LOGOUT', () => {
    const newSate = auth(initialState, {
      type: actionTypes.LOGOUT
    });
    expect(newSate).toEqual(initialState);
  });

  it('should return new state if action type is SET_AUTH_REDIRECT_PATH', () => {
    const payload = {
      path: '/products'
    };
    const newSate = auth(initialState, {
      type: actionTypes.SET_AUTH_REDIRECT_PATH,
      payload
    });
    expect(newSate).toEqual({
      ...initialState,
      authRedirectPath: payload.path
    });
  });
});
