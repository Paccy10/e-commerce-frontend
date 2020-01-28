import React from 'react';
import { shallow } from 'enzyme';
import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import ConnectedCreate, {
  Create
} from '../../../../../containers/Admin/Resources/Product/Create/Create';

const mockStore = configureMockStore([thunk]);

const props = {
  onCreateProduct: jest.fn(),
  history: { push: jest.fn() },
  onFetchCategories: () => {
    return Promise.resolve({});
  },
  onFetchBrands: () => {
    return Promise.resolve({});
  },
  categories: [{ id: 1, name: 'name' }],
  brands: [{ id: 1, name: 'name' }]
};

describe('<Create /> Component (Product)', () => {
  const component = shallow(<Create {...props} />);

  let wrapper;
  let store;

  beforeEach(() => {
    const initialState = {
      auth: {
        token: 'token'
      },
      product: {
        message: 'created'
      },
      category: { categories: [] },
      brand: { brands: [] }
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
      target: { value: 'name', files: [] }
    };
    component.setState({
      loading: false,
      productForm: {
        mainImage: {
          elementConfig: { type: 'file' },
          validation: { required: true }
        }
      }
    });
    const input = component.find('Input').at(0);
    input.simulate('change', event, 'mainImage');
    expect(input.length).toBe(1);
    expect(inputChangeHandler).toHaveBeenCalled();
  });

  it('should call inputChangeHandler method when the input value is changed', () => {
    const inputChangeHandler = jest.spyOn(
      component.instance(),
      'inputChangeHandler'
    );
    component.instance().forceUpdate();

    const event = {
      target: { value: 'name', files: { file: '' } }
    };

    component.setState({
      loading: false,
      productForm: {
        images: {
          elementConfig: { type: 'file' },
          validation: { required: true }
        }
      }
    });
    const input = component.find('Input').at(0);
    input.simulate('change', event, 'images');
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
    component.setState({
      mainImage: true
    });
    form.simulate('submit', event);
    expect(form.length).toBe(1);
    expect(formSubmitHandler).toHaveBeenCalled();
  });

  it('should call componentWillReceiveProps', () => {
    component.setProps({ message: 'Product successfully created' });
    expect(component.instance().props.message).toBe(
      'Product successfully created'
    );
  });

  it('should map state to props', () => {
    expect(wrapper.props().message).toBe('created');
  });

  it('should map dispatch to props', () => {
    wrapper.simulate('createProduct');
    wrapper.simulate('fetchCategories');
    wrapper.simulate('fetchBrands');
    wrapper.simulate('setAlert');
    wrapper.simulate('createProductStart');

    const actions = store.getActions();
    expect(actions.length).toEqual(4);
  });
});
