import axios from 'axios';
import setAuthToken from '../../utils/setAuthToken';

describe('setAuthToken function', () => {
  it('should delete token from axios headers', () => {
    setAuthToken('token');
    expect(axios.defaults.headers.common.Authorization).toBe('token');
  });
});
