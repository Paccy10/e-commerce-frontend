import moxios from 'moxios';
import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import * as actionTypes from '../../../store/actions/types';
import * as actions from '../../../store/actions';

const mockStore = configureMockStore([thunk]);
const store = mockStore({
  status: null,
  message: null,
  brands: [],
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

  it('should fetch all brands', () => {
    const expectedAction = {
      type: actionTypes.FETCH_BRANDS_SUCCESS,
      payload: {
        status: 'success',
        message: 'brands fetched',
        brands: []
      }
    };

    moxios.wait(() => {
      const request = moxios.requests.mostRecent();
      request.respondWith({
        status: 200,
        response: {
          status: 'success',
          message: 'brands fetched',
          data: {
            brands: []
          }
        }
      });
    });

    return store.dispatch(actions.fetchBrands()).then(() => {
      expect(store.getActions()[1]).toEqual(expectedAction);
    });
  });

  it('should not fetch brands', () => {
    const expectedAction = {
      type: actionTypes.FETCH_BRANDS_FAIL,
      payload: {}
    };

    moxios.wait(() => {
      const request = moxios.requests.mostRecent();
      request.respondWith({
        status: 400,
        response: {}
      });
    });

    return store.dispatch(actions.fetchBrands()).then(() => {
      expect(store.getActions()[1]).toEqual(expectedAction);
    });
  });
});
