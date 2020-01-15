import React from 'react';
import { shallow } from 'enzyme';
import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import ConnectedLogin, { Login } from '../../../containers/Auth/Login/Login';

const mockStore = configureMockStore([thunk]);

const props = {
  onLogin: jest.fn()
};

describe('<Login /> Component', () => {
  let component = shallow(<Login {...props} />);

  let wrapper;
  let store;

  beforeEach(() => {
    const initialState = {
      auth: {
        loading: false
      }
    };
    store = mockStore(initialState);
    wrapper = shallow(<ConnectedLogin store={store} />).dive();
  });

  it('should render without crashing', () => {
    expect(component).toMatchSnapshot();
  });

  it('should call inputChangeHandler method when the input value is changed', () => {
    const inputChangeHandler = jest.spyOn(
      component.instance(),
      'inputChangeHandler'
    );
    component.instance().forceUpdate();

    const event = {
      target: { value: 'email' }
    };
    const input = component.find('Input').at(0);
    input.simulate('change', event);
    expect(input.length).toBe(1);
    expect(inputChangeHandler).toHaveBeenCalled();
  });

  it('should redirect when a user is authenticated', () => {
    props.isAuthenticated = true;
    component = shallow(<Login {...props} />);
    expect(component).toMatchSnapshot();
  });

  it('should call formSubmitHandler method when the form  is submitted', () => {
    const formSubmitHandler = jest.spyOn(
      component.instance(),
      'formSubmitHandler'
    );
    component.instance().forceUpdate();

    const event = { preventDefault: () => {} };

    const form = component.find('form');
    form.simulate('submit', event);
    expect(form.length).toBe(1);
    expect(formSubmitHandler).toHaveBeenCalled();
  });

  it('should map state to props', () => {
    expect(wrapper.props().loading).toBe(false);
  });

  it('should map dispatch to props', () => {
    wrapper.simulate('login');

    const actions = store.getActions();
    expect(actions.length).toEqual(1);
  });
});
