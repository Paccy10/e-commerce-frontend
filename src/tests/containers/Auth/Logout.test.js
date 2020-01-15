import React from 'react';
import { shallow } from 'enzyme';
import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import ConnectedLogout, {
  Logout
} from '../../../containers/Auth/Logout/Logout';

const mockStore = configureMockStore([thunk]);

const props = {
  onLogout: jest.fn()
};

describe('<Logout /> Component', () => {
  const component = shallow(<Logout {...props} />);
  let wrapper;
  let store;

  beforeEach(() => {
    const initialState = {};
    store = mockStore(initialState);
    wrapper = shallow(<ConnectedLogout store={store} />).dive();
  });

  it('should render without crashing', () => {
    expect(component).toMatchSnapshot();
  });

  it('should map dispatch to props', () => {
    wrapper.simulate('logout');

    const actions = store.getActions();
    expect(actions.length).toEqual(1);
  });
});
