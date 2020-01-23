import React from 'react';
import { shallow } from 'enzyme';
import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import ConnectedEdit, {
  Edit
} from '../../../../../containers/Admin/Resources/Brand/Edit/Edit';

const mockStore = configureMockStore([thunk]);

const props = {
  match: { params: { brandId: 1 } },
  onFetchBrand: () => {
    return Promise.resolve({});
  },
  onUpdateBrand: () => {
    return Promise.resolve({});
  },
  brand: {
    name: 'name',
    description: 'description'
  },
  history: { push: jest.fn() }
};

describe('<Edit /> Component (Brand)', () => {
  const component = shallow(<Edit {...props} />);

  let wrapper;
  let store;

  beforeEach(() => {
    const initialState = {
      auth: {
        token: 'token'
      },
      brand: {
        loading: false,
        brands: []
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
    component.setProps({ message: 'Brand successfully updated' });
    expect(component.instance().props.message).toBe(
      'Brand successfully updated'
    );
  });

  it('should map state to props', () => {
    expect(wrapper.props().loading).toBe(false);
  });

  it('should map dispatch to props', () => {
    wrapper.simulate('fetchBrand');
    wrapper.simulate('updateBrand');

    const actions = store.getActions();
    expect(actions.length).toEqual(2);
  });
});
