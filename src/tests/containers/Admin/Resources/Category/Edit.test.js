import React from 'react';
import { shallow } from 'enzyme';
import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import ConnectedEdit, {
  Edit
} from '../../../../../containers/Admin/Resources/Category/Edit/Edit';

const mockStore = configureMockStore([thunk]);

const props = {
  match: { params: { categoryId: 1 } },
  onFetchCategory: () => {
    return Promise.resolve({});
  },
  onUpdateCategory: () => {
    return Promise.resolve({});
  },
  category: {
    name: 'name',
    description: 'description'
  },
  history: { push: jest.fn() },
  onFetchCategories: () => {
    return Promise.resolve({});
  },
  categories: [{ id: 1, name: 'name' }]
};

describe('<Edit /> Component (Category)', () => {
  const component = shallow(<Edit {...props} />);

  let wrapper;
  let store;

  beforeEach(() => {
    const initialState = {
      auth: {
        token: 'token'
      },
      category: {
        loading: false,
        categories: []
      }
    };
    store = mockStore(initialState);
    wrapper = shallow(<ConnectedEdit store={store} />).dive();
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
    component.setState({ loading: false });
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
    component.setState({ loading: false });
    const form = component.find('form');
    form.simulate('submit', event);
    expect(form.length).toBe(1);
    expect(formSubmitHandler).toHaveBeenCalled();
  });

  it('should call componentWillReceiveProps', () => {
    component.setProps({ message: 'Category successfully updated' });
    expect(component.instance().props.message).toBe(
      'Category successfully updated'
    );
  });

  it('should map state to props', () => {
    expect(wrapper.props().loading).toBe(false);
  });

  it('should map dispatch to props', () => {
    wrapper.simulate('fetchCategories');
    wrapper.simulate('updateCategory');

    const actions = store.getActions();
    expect(actions.length).toEqual(2);
  });
});
