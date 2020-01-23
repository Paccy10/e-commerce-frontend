import React from 'react';
import { shallow } from 'enzyme';
import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import ConnectedIndex, {
  Index
} from '../../../../../containers/Admin/Resources/Category/Index/Index';

const mockStore = configureMockStore([thunk]);

const props = {
  categories: [{ name: 'Nike', description: 'Nike is good' }],
  onFetchCategories: jest.fn(),
  history: { push: jest.fn() },
  onDeleteCategory: () => {
    return Promise.resolve({});
  }
};

describe('<Index /> Component (Category)', () => {
  const component = shallow(<Index {...props} />);
  let wrapper;
  let store;

  beforeEach(() => {
    const initialState = {
      category: {
        categories: []
      },
      auth: {
        token: 'token'
      }
    };
    store = mockStore(initialState);
    wrapper = shallow(<ConnectedIndex store={store} />).dive();
  });

  it('should render without crashing', () => {
    expect(component).toMatchSnapshot();
  });

  it('should call onCreate method when the button is clicked', () => {
    const onCreate = jest.spyOn(component.instance(), 'onCreate');
    component.instance().forceUpdate();

    const button = component.find('Button').at(0);
    button.simulate('click');
    expect(button.length).toBe(1);
    expect(onCreate).toHaveBeenCalled();
  });

  it('should call onDelete method when the button is clicked', () => {
    const onDelete = jest.spyOn(component.instance(), 'onDelete');
    component.instance().forceUpdate();

    const button = component.find('Button').at(2);
    button.simulate('click');
    expect(button.length).toBe(1);
    expect(onDelete).toHaveBeenCalled();
  });

  it('should call onEdit method when the button is clicked', () => {
    const onEdit = jest.spyOn(component.instance(), 'onEdit');
    component.instance().forceUpdate();

    const button = component.find('Button').at(1);
    button.simulate('click');
    expect(button.length).toBe(1);
    expect(onEdit).toHaveBeenCalled();
  });

  it('should call deleteCancelHandler method when the button is clicked', () => {
    const instance = component.instance();
    instance.deleteCancelHandler();

    expect(component.state('deleting')).toBe(false);
  });

  it('should call deleteContinueHandler method when the button is clicked', () => {
    const instance = component.instance();
    component.setState({ category: { id: 1 } });
    instance.deleteContinueHandler();

    expect(component.state('deleting')).toBe(false);
  });

  it('should map state to props', () => {
    expect(wrapper.props().categories).toEqual([]);
  });

  it('should map dispatch to props', () => {
    wrapper.simulate('fetchCategories');
    wrapper.simulate('deleteCategory');

    const actions = store.getActions();
    expect(actions.length).toEqual(2);
  });
});
