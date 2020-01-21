import React from 'react';
import { shallow } from 'enzyme';
import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import ConnectedCreate, {
  Create
} from '../../../../../containers/Admin/Resources/Brand/Create/Create';

const mockStore = configureMockStore([thunk]);

const props = {
  onCreateBrand: jest.fn(),
  history: { push: jest.fn() }
};

describe('<Create /> Component (Brand)', () => {
  const component = shallow(<Create {...props} />);

  let wrapper;
  let store;

  beforeEach(() => {
    const initialState = {
      auth: {
        token: 'token'
      },
      brand: {
        status: 'success'
      }
    };
    store = mockStore(initialState);
    wrapper = shallow(<ConnectedCreate store={store} />).dive();
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
      target: { value: 'name' }
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

  it('should call componentWillReceiveProps', () => {
    component.setProps({ status: 'success' });
    expect(component.instance().props.status).toBe('success');
  });

  it('should map state to props', () => {
    expect(wrapper.props().status).toBe('success');
  });

  it('should map dispatch to props', () => {
    wrapper.simulate('createBrand');

    const actions = store.getActions();
    expect(actions.length).toEqual(1);
  });
});
