import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import * as actionTypes from '../../../store/actions/types';
import * as actions from '../../../store/actions';

const mockStore = configureMockStore([thunk]);
const store = mockStore();

describe('Alert actions', () => {
  beforeEach(() => {
    jest.useFakeTimers();
    store.clearActions();
  });

  it('should set the alert', () => {
    store.dispatch(actions.setAlert('message', 'alertType'));
    const expectedAction = {
      type: actionTypes.SET_ALERT,
      payload: {
        message: 'message',
        alertType: 'alertType'
      }
    };
    jest.runAllTimers();
    expect(store.getActions()[0]).toEqual(expectedAction);
  });

  it('should remove the alert', () => {
    store.dispatch(actions.removeAlert());
    const expectedAction = {
      type: actionTypes.REMOVE_ALERT
    };
    expect(store.getActions()[0]).toEqual(expectedAction);
  });
});
