import React from 'react';
import { shallow } from 'enzyme';
import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import ConnectedActivateUser, {
  ActivateUser
} from '../../../containers/Auth/ActivateUser/ActivateUser';

const mockStore = configureMockStore([thunk]);

let props = {
  onActivateUser: jest.fn(),
  match: {
    params: {
      token: 'token'
    }
  },
  history: { push: jest.fn() }
};

describe('<Alert /> Component', () => {
  const component = shallow(<ActivateUser {...props} />);
  let wrapper;
  let store;

  beforeEach(() => {
    const initialState = {
      auth: {
        loading: false
      }
    };
    store = mockStore(initialState);
    wrapper = shallow(<ConnectedActivateUser store={store} />).dive();
  });

  it('should render without crashing', () => {
    expect(component).toMatchSnapshot();
  });

  it('should call activateUserHandler method when the button is clicked', () => {
    const activateUserHandler = jest.spyOn(
      component.instance(),
      'activateUserHandler'
    );
    component.instance().forceUpdate();

    const button = component.find('Button').at(0);
    button.simulate('click');
    expect(button.length).toBe(1);
    expect(activateUserHandler).toHaveBeenCalled();
  });

  it('should call componentWillReceiveProps with different status prop', () => {
    component.setProps({ status: 'success' });
    props = component.instance().props;
    expect(props.status).toBe('success');
  });

  it('should map state to props', () => {
    expect(wrapper.props().loading).toBe(false);
  });

  it('should map dispatch to props', () => {
    wrapper.simulate('activateUser');

    const actions = store.getActions();
    expect(actions.length).toEqual(1);
  });
});
