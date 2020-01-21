import React from 'react';
import { shallow } from 'enzyme';
import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import ConnectedApp, { App } from '../App';

const mockStore = configureMockStore([thunk]);

const props = {};

describe('<App /> Component', () => {
  let component = shallow(<App />);
  let wrapper;
  let store;

  beforeEach(() => {
    const initialState = {
      auth: {
        token: 'token',
        user: { is_admin: true }
      }
    };
    store = mockStore(initialState);
    wrapper = shallow(<ConnectedApp store={store} />).dive();
  });
  it('should render without crashing', () => {
    expect(component).toMatchSnapshot();
  });

  it('should render different routes if the user is authenticated', () => {
    props.isAuthenticated = true;
    props.isAdmin = false;
    component = shallow(<App {...props} />);
    expect(component).toMatchSnapshot();
  });

  it('should render different routes if the user is an admin', () => {
    props.isAuthenticated = true;
    props.isAdmin = true;
    component = shallow(<App {...props} />);
    expect(component).toMatchSnapshot();
  });

  it('should map state to props', () => {
    expect(wrapper.props().isAuthenticated).toEqual(true);
  });
});
