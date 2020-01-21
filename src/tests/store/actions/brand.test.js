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

  it('should delete a brand', () => {
    const expectedAction = {
      type: actionTypes.DELETE_BRAND_SUCCESS,
      payload: {
        status: 'success',
        message: 'brand deleted'
      }
    };

    moxios.wait(() => {
      const request = moxios.requests.mostRecent();
      request.respondWith({
        status: 200,
        response: {
          status: 'success',
          message: 'brand deleted'
        }
      });
    });

    return store.dispatch(actions.deleteBrand()).then(() => {
      expect(store.getActions()[1]).toEqual(expectedAction);
    });
  });

  it('should not delete a brand', () => {
    const expectedAction = {
      type: actionTypes.DELETE_BRAND_FAIL,
      payload: {
        status: 'error',
        message: 'brand not deleted'
      }
    };

    moxios.wait(() => {
      const request = moxios.requests.mostRecent();
      request.respondWith({
        status: 400,
        response: {
          status: 'error',
          message: 'brand not deleted'
        }
      });
    });

    return store.dispatch(actions.deleteBrand()).then(() => {
      expect(store.getActions()[1]).toEqual(expectedAction);
    });
  });

  it('should create a brand', () => {
    const expectedAction = {
      type: actionTypes.CREATE_BRAND_SUCCESS,
      payload: {
        status: 'success',
        message: 'brand created'
      }
    };

    moxios.wait(() => {
      const request = moxios.requests.mostRecent();
      request.respondWith({
        status: 201,
        response: {
          status: 'success',
          message: 'brand created'
        }
      });
    });

    return store.dispatch(actions.createBrand()).then(() => {
      expect(store.getActions()[1]).toEqual(expectedAction);
    });
  });

  it('should not create a brand', () => {
    const expectedAction = {
      type: actionTypes.CREATE_BRAND_FAIL,
      payload: {
        status: 'error',
        message: 'brand not created'
      }
    };

    moxios.wait(() => {
      const request = moxios.requests.mostRecent();
      request.respondWith({
        status: 400,
        response: {
          status: 'error',
          message: 'brand not created'
        }
      });
    });

    return store.dispatch(actions.createBrand()).then(() => {
      expect(store.getActions()[1]).toEqual(expectedAction);
    });
  });

  it('should fetch a brand', () => {
    const expectedAction = {
      type: actionTypes.FETCH_BRAND_SUCCESS,
      payload: {
        status: 'success',
        message: 'brand fetched',
        brand: {}
      }
    };

    moxios.wait(() => {
      const request = moxios.requests.mostRecent();
      request.respondWith({
        status: 200,
        response: {
          status: 'success',
          message: 'brand fetched',
          data: {
            brand: {}
          }
        }
      });
    });

    return store.dispatch(actions.fetchBrand()).then(() => {
      expect(store.getActions()[1]).toEqual(expectedAction);
    });
  });

  it('should not fetch a brand', () => {
    const expectedAction = {
      type: actionTypes.FETCH_BRAND_FAIL,
      payload: {
        status: 'error',
        message: 'brand not fetched'
      }
    };

    moxios.wait(() => {
      const request = moxios.requests.mostRecent();
      request.respondWith({
        status: 400,
        response: {
          status: 'error',
          message: 'brand not fetched'
        }
      });
    });

    return store.dispatch(actions.fetchBrand()).then(() => {
      expect(store.getActions()[1]).toEqual(expectedAction);
    });
  });

  it('should update a brand', () => {
    const expectedAction = {
      type: actionTypes.UPDATE_BRAND_SUCCESS,
      payload: {
        status: 'success',
        message: 'brand updated'
      }
    };

    moxios.wait(() => {
      const request = moxios.requests.mostRecent();
      request.respondWith({
        status: 200,
        response: {
          status: 'success',
          message: 'brand updated'
        }
      });
    });

    return store.dispatch(actions.updateBrand()).then(() => {
      expect(store.getActions()[1]).toEqual(expectedAction);
    });
  });

  it('should not update a brand', () => {
    const expectedAction = {
      type: actionTypes.UPDATE_BRAND_FAIL,
      payload: {
        status: 'success',
        message: 'brand not updated'
      }
    };

    moxios.wait(() => {
      const request = moxios.requests.mostRecent();
      request.respondWith({
        status: 400,
        response: {
          status: 'success',
          message: 'brand not updated'
        }
      });
    });

    return store.dispatch(actions.updateBrand()).then(() => {
      expect(store.getActions()[1]).toEqual(expectedAction);
    });
  });
});
