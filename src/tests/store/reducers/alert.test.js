import * as actionTypes from '../../../store/actions/types';
import alert from '../../../store/reducers/alert';

describe('Alert reducer', () => {
  const initialState = {
    message: null,
    alertType: null
  };
  it('should return new state if action type is SET_ALERT', () => {
    const payload = {
      message: 'resource created',
      alertType: 'success'
    };
    const newSate = alert(initialState, {
      type: actionTypes.SET_ALERT,
      payload
    });
    expect(newSate).toEqual(payload);
  });

  it('should return new state if action type is REMOVE_ALERT', () => {
    const newSate = alert(initialState, {
      type: actionTypes.REMOVE_ALERT
    });
    expect(newSate).toEqual(initialState);
  });
});
