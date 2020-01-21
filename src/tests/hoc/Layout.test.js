import React from 'react';
import { shallow } from 'enzyme';
import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import ConnectedLayout, { Layout } from '../../hoc/Layout/Layout';

const mockStore = configureMockStore([thunk]);

const props = {
  children: <div></div>,
  onTryAutoSignup: jest.fn()
};

describe('<Layout /> Component', () => {
  const component = shallow(<Layout {...props} />);

  let wrapper;
  let store;

  beforeEach(() => {
    const initialState = {
      auth: {
        loading: false,
        user: { is_admin: true }
      }
    };
    store = mockStore(initialState);
    wrapper = shallow(<ConnectedLayout store={store} {...props} />).dive();
  });

  it('should render without crashing', () => {
    expect(component).toMatchSnapshot();
  });

  it('should map state to props', () => {
    expect(wrapper.props().isAuthenticated).toBe(true);
  });

  it('should map dispatch to props', () => {
    wrapper.simulate('tryAutoSignup');

    const actions = store.getActions();
    expect(actions.length).toEqual(1);
  });
});
