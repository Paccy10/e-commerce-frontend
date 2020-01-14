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
});
