import moxios from 'moxios';
import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import * as actionTypes from '../../../store/actions/types';
import * as actions from '../../../store/actions';

const mockStore = configureMockStore([thunk]);
const store = mockStore({
  status: null,
  message: null,
  token: null,
  user: null,
  loading: false
});

describe('Auth actions', () => {
  beforeEach(() => {
    moxios.install();
    store.clearActions();
  });

  afterEach(() => {
    moxios.uninstall();
  });

  it('should register a new user', () => {
    const expectedAction = {
      type: actionTypes.SIGNUP_SUCCESS,
      payload: {
        status: 'success',
        message: 'registered'
      }
    };

    moxios.wait(() => {
      const request = moxios.requests.mostRecent();
      request.respondWith({
        status: 201,
        response: {
          status: 'success',
          message: 'registered'
        }
      });
    });

    return store.dispatch(actions.signup()).then(() => {
      expect(store.getActions()[1]).toEqual(expectedAction);
    });
  });

  it('should not register a new user', () => {
    const expectedAction = {
      type: actionTypes.SIGNUP_FAIL,
      payload: {
        status: 'error',
        message: 'not registered'
      }
    };

    moxios.wait(() => {
      const request = moxios.requests.mostRecent();
      request.respondWith({
        status: 400,
        response: {
          status: 'error',
          message: 'not registered'
        }
      });
    });

    return store.dispatch(actions.signup()).then(() => {
      expect(store.getActions()[1]).toEqual(expectedAction);
    });
  });

  it('should activate a new user account', () => {
    const expectedAction = {
      type: actionTypes.ACTIVATE_SUCCESS,
      payload: {
        status: 'success',
        message: 'activated'
      }
    };

    moxios.wait(() => {
      const request = moxios.requests.mostRecent();
      request.respondWith({
        status: 200,
        response: {
          status: 'success',
          message: 'activated'
        }
      });
    });

    return store.dispatch(actions.activate()).then(() => {
      expect(store.getActions()[1]).toEqual(expectedAction);
    });
  });

  it('should not activate a new user', () => {
    const expectedAction = {
      type: actionTypes.ACTIVATE_FAIL,
      payload: {
        status: 'error',
        message: 'not activated'
      }
    };

    moxios.wait(() => {
      const request = moxios.requests.mostRecent();
      request.respondWith({
        status: 400,
        response: {
          status: 'error',
          message: 'not activated'
        }
      });
    });

    return store.dispatch(actions.activate()).then(() => {
      expect(store.getActions()[1]).toEqual(expectedAction);
    });
  });

  it('should login a user', () => {
    const expectedAction = {
      type: actionTypes.LOGIN_SUCCESS,
      payload: {
        status: 'success',
        message: 'logged in',
        token: 'token',
        user: {}
      }
    };

    moxios.wait(() => {
      const request = moxios.requests.mostRecent();
      request.respondWith({
        status: 200,
        response: {
          status: 'success',
          message: 'logged in',
          data: {
            token: 'token',
            user: {}
          }
        }
      });
    });

    return store.dispatch(actions.login()).then(() => {
      expect(store.getActions()[1]).toEqual(expectedAction);
    });
  });

  it('should not login a user', () => {
    const expectedAction = {
      type: actionTypes.LOGIN_FAIL,
      payload: {
        status: 'error',
        message: 'not logged in'
      }
    };

    moxios.wait(() => {
      const request = moxios.requests.mostRecent();
      request.respondWith({
        status: 400,
        response: {
          status: 'error',
          message: 'not logged in'
        }
      });
    });

    return store.dispatch(actions.login()).then(() => {
      expect(store.getActions()[1]).toEqual(expectedAction);
    });
  });

  it('should auto-login the user', () => {
    localStorage.setItem(
      'expirationDate',
      'Thu Jan 16 2020 09:22:34 GMT+0200 (Central Africa Time)'
    );

    store.dispatch(actions.authCheckState());
    expect(store.getActions().length).toEqual(1);
  });

  it('should not auto-login the user', () => {
    localStorage.setItem(
      'expirationDate',
      'Tue Jan 14 2020 09:22:34 GMT+0200 (Central Africa Time)'
    );

    store.dispatch(actions.authCheckState());
    expect(store.getActions().length).toEqual(1);
  });

  it('should set the auth redirect link', () => {
    const expectedAction = {
      type: actionTypes.SET_AUTH_REDIRECT_PATH,
      payload: {
        path: '/products'
      }
    };

    store.dispatch(actions.setAuthRedirectPath('/products'));
    expect(store.getActions()[0]).toEqual(expectedAction);
  });

  it('should check the auth timeout', () => {
    jest.useFakeTimers();
    store.dispatch(actions.checkAuthTimeout(1));
    jest.runAllTimers();
    expect(store.getActions().length).toEqual(1);
  });
});
