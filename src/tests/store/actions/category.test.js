import moxios from 'moxios';
import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import * as actionTypes from '../../../store/actions/types';
import * as actions from '../../../store/actions';

const mockStore = configureMockStore([thunk]);
const store = mockStore({
  status: null,
  message: null,
  categories: [],
  loading: false
});

describe('Category actions', () => {
  beforeEach(() => {
    moxios.install();
    store.clearActions();
  });

  afterEach(() => {
    moxios.uninstall();
  });

  it('should fetch all categories', () => {
    const expectedAction = {
      type: actionTypes.FETCH_CATEGORIES_SUCCESS,
      payload: {
        status: 'success',
        message: 'categories fetched',
        categories: []
      }
    };

    moxios.wait(() => {
      const request = moxios.requests.mostRecent();
      request.respondWith({
        status: 200,
        response: {
          status: 'success',
          message: 'categories fetched',
          data: {
            categories: []
          }
        }
      });
    });

    return store.dispatch(actions.fetchCategories()).then(() => {
      expect(store.getActions()[1]).toEqual(expectedAction);
    });
  });

  it('should not fetch categories', () => {
    const expectedAction = {
      type: actionTypes.FETCH_CATEGORIES_FAIL,
      payload: {}
    };

    moxios.wait(() => {
      const request = moxios.requests.mostRecent();
      request.respondWith({
        status: 400,
        response: {}
      });
    });

    return store.dispatch(actions.fetchCategories()).then(() => {
      expect(store.getActions()[1]).toEqual(expectedAction);
    });
  });

  it('should delete a category', () => {
    const expectedAction = {
      type: actionTypes.DELETE_CATEGORY_SUCCESS,
      payload: {
        status: 'success',
        message: 'category deleted'
      }
    };

    moxios.wait(() => {
      const request = moxios.requests.mostRecent();
      request.respondWith({
        status: 200,
        response: {
          status: 'success',
          message: 'category deleted'
        }
      });
    });

    return store.dispatch(actions.deleteCategory()).then(() => {
      expect(store.getActions()[1]).toEqual(expectedAction);
    });
  });

  it('should not delete a category', () => {
    const expectedAction = {
      type: actionTypes.DELETE_CATEGORY_FAIL,
      payload: {
        status: 'error',
        message: 'category not deleted'
      }
    };

    moxios.wait(() => {
      const request = moxios.requests.mostRecent();
      request.respondWith({
        status: 400,
        response: {
          status: 'error',
          message: 'category not deleted'
        }
      });
    });

    return store.dispatch(actions.deleteCategory()).then(() => {
      expect(store.getActions()[1]).toEqual(expectedAction);
    });
  });

  it('should create a category', () => {
    const expectedAction = {
      type: actionTypes.CREATE_CATEGORY_SUCCESS,
      payload: {
        status: 'success',
        message: 'category created'
      }
    };

    moxios.wait(() => {
      const request = moxios.requests.mostRecent();
      request.respondWith({
        status: 201,
        response: {
          status: 'success',
          message: 'category created'
        }
      });
    });

    return store.dispatch(actions.createCategory()).then(() => {
      expect(store.getActions()[1]).toEqual(expectedAction);
    });
  });

  it('should not create a category', () => {
    const expectedAction = {
      type: actionTypes.CREATE_CATEGORY_FAIL,
      payload: {
        status: 'error',
        message: 'category not created'
      }
    };

    moxios.wait(() => {
      const request = moxios.requests.mostRecent();
      request.respondWith({
        status: 400,
        response: {
          status: 'error',
          message: 'category not created'
        }
      });
    });

    return store.dispatch(actions.createCategory()).then(() => {
      expect(store.getActions()[1]).toEqual(expectedAction);
    });
  });

  it('should fetch a category', () => {
    const expectedAction = {
      type: actionTypes.FETCH_CATEGORY_SUCCESS,
      payload: {
        status: 'success',
        message: 'category fetched',
        category: {}
      }
    };

    moxios.wait(() => {
      const request = moxios.requests.mostRecent();
      request.respondWith({
        status: 200,
        response: {
          status: 'success',
          message: 'category fetched',
          data: {
            category: {}
          }
        }
      });
    });

    return store.dispatch(actions.fetchCategory()).then(() => {
      expect(store.getActions()[1]).toEqual(expectedAction);
    });
  });

  it('should not fetch a category', () => {
    const expectedAction = {
      type: actionTypes.FETCH_CATEGORY_FAIL,
      payload: {
        status: 'error',
        message: 'category not fetched'
      }
    };

    moxios.wait(() => {
      const request = moxios.requests.mostRecent();
      request.respondWith({
        status: 400,
        response: {
          status: 'error',
          message: 'category not fetched'
        }
      });
    });

    return store.dispatch(actions.fetchCategory()).then(() => {
      expect(store.getActions()[1]).toEqual(expectedAction);
    });
  });

  it('should update a category', () => {
    const expectedAction = {
      type: actionTypes.UPDATE_CATEGORY_SUCCESS,
      payload: {
        status: 'success',
        message: 'category updated'
      }
    };

    moxios.wait(() => {
      const request = moxios.requests.mostRecent();
      request.respondWith({
        status: 200,
        response: {
          status: 'success',
          message: 'category updated'
        }
      });
    });

    return store.dispatch(actions.updateCategory()).then(() => {
      expect(store.getActions()[1]).toEqual(expectedAction);
    });
  });

  it('should not update a category', () => {
    const expectedAction = {
      type: actionTypes.UPDATE_CATEGORY_FAIL,
      payload: {
        status: 'success',
        message: 'category not updated'
      }
    };

    moxios.wait(() => {
      const request = moxios.requests.mostRecent();
      request.respondWith({
        status: 400,
        response: {
          status: 'success',
          message: 'category not updated'
        }
      });
    });

    return store.dispatch(actions.updateCategory()).then(() => {
      expect(store.getActions()[1]).toEqual(expectedAction);
    });
  });
});
