import React from 'react';
import { shallow } from 'enzyme';
import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import ConnectedSignup, {
  Signup
} from '../../../containers/Auth/Signup/Signup';

const mockStore = configureMockStore([thunk]);

let props = {
  onSignup: jest.fn(),
  onSetAlert: jest.fn()
};

describe('<Signup /> Component', () => {
  const component = shallow(<Signup {...props} />);
  let wrapper;
  let store;

  beforeEach(() => {
    const initialState = {
      auth: {
        loading: false
      }
    };
    store = mockStore(initialState);
    wrapper = shallow(<ConnectedSignup store={store} />).dive();
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

  it('should check if passwords match', () => {
    component.setState({
      signupForm: {
        firstname: {
          elementType: 'input',
          label: 'Firstname',
          elementConfig: {
            type: 'text'
          },
          value: 'firstname',
          validation: {
            required: true
          },
          valid: false,
          touched: false,
          errorMessage: ''
        },
        lastname: {
          elementType: 'input',
          label: 'Lastname',
          elementConfig: {
            type: 'text'
          },
          value: 'lastname',
          validation: {
            required: true
          },
          valid: false,
          touched: false,
          errorMessage: ''
        },
        email: {
          elementType: 'input',
          label: 'E-mail Address',
          elementConfig: {
            type: 'email',
            placeholder: 'name@example.com'
          },
          value: 'email@example.com',
          validation: {
            required: true,
            isEmail: true
          },
          valid: false,
          touched: false,
          errorMessage: ''
        },
        password: {
          elementType: 'input',
          label: 'Password',
          elementConfig: {
            type: 'password'
          },
          value: 'password',
          validation: {
            required: true,
            minLength: 8
          },
          valid: false,
          touched: false,
          errorMessage: ''
        },
        confirmPassword: {
          elementType: 'input',
          label: 'Confirm Password',
          elementConfig: {
            type: 'password'
          },
          value: 'confirmPassword',
          validation: {
            required: true
          },
          valid: false,
          touched: false,
          errorMessage: ''
        }
      }
    });
    const formSubmitHandler = jest.spyOn(
      component.instance(),
      'formSubmitHandler'
    );
    component.instance().forceUpdate();

    const fakeEvent = { preventDefault: () => {} };
    const form = component.find('form');
    form.simulate('submit', fakeEvent);
    expect(form.length).toBe(1);
    expect(formSubmitHandler).toHaveBeenCalled();
  });

  it('should call componentWillReceiveProps with different status prop', () => {
    component.setState({
      signupForm: {
        password: {
          elementType: 'input',
          label: 'Password',
          elementConfig: {
            type: 'password'
          },
          value: 'password',
          validation: {
            required: true,
            minLength: 8
          },
          valid: false,
          touched: false,
          errorMessage: ''
        },
        confirmPassword: {
          elementType: 'input',
          label: 'Confirm Password',
          elementConfig: {
            type: 'password'
          },
          value: 'confirmPassword',
          validation: {
            required: true
          },
          valid: false,
          touched: false,
          errorMessage: ''
        }
      }
    });
    component.setProps({ status: 'success' });
    props = component.instance().props;
    expect(props.status).toBe('success');
  });

  it('should map state to props', () => {
    expect(wrapper.props().loading).toBe(false);
  });

  it('should map dispatch to props', () => {
    wrapper.simulate('signup');
    wrapper.simulate('setAlert');

    const actions = store.getActions();
    expect(actions.length).toEqual(2);
  });
});
