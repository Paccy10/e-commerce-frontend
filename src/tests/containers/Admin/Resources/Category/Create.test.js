import React from 'react';
import { shallow } from 'enzyme';
import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import ConnectedCreate, {
  Create
} from '../../../../../containers/Admin/Resources/Category/Create/Create';

const mockStore = configureMockStore([thunk]);

const props = {
  onCreateCategory: jest.fn(),
  history: { push: jest.fn() },
  onFetchCategories: () => {
    return Promise.resolve({});
  },
  categories: [{ id: 1, name: 'name' }]
};

describe('<Create /> Component (Category)', () => {
  const component = shallow(<Create {...props} />);

  let wrapper;
  let store;

  beforeEach(() => {
    const initialState = {
      auth: {
        token: 'token'
      },
      category: {
        message: 'created'
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
    component.setProps({ message: 'Category successfully created' });
    expect(component.instance().props.message).toBe(
      'Category successfully created'
    );
  });

  it('should map state to props', () => {
    expect(wrapper.props().message).toBe('created');
  });

  it('should map dispatch to props', () => {
    wrapper.simulate('createCategory');
    wrapper.simulate('fetchCategories');

    const actions = store.getActions();
    expect(actions.length).toEqual(2);
  });
});
