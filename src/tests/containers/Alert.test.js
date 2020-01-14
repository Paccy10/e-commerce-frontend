import React from 'react';
import { shallow } from 'enzyme';
import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import ConnectedAlert, { Alert } from '../../containers/Alert/Alert';

const mockStore = configureMockStore([thunk]);

const props = {
  alert: {
    alertType: 'Success',
    message: 'Good'
  },
  onRemoveAlert: jest.fn()
};

describe('<Alert /> Component', () => {
  let component = shallow(<Alert {...props} />);
  let wrapper;
  let store;

  beforeEach(() => {
    const initialState = {
      alert: {
        alertType: 'Danger',
        message: 'Bad'
      }
    };
    store = mockStore(initialState);
    wrapper = shallow(<ConnectedAlert store={store} />).dive();
  });

  it('should render without crashing', () => {
    expect(component).toMatchSnapshot();
  });

  it('should render alert with Danger alert Type', () => {
    props.alert.alertType = 'Danger';
    component = shallow(<Alert {...props} />);
    expect(component).toMatchSnapshot();
  });

  it('should render alert with Warning alert Type', () => {
    props.alert.alertType = 'Warning';
    component = shallow(<Alert {...props} />);
    expect(component).toMatchSnapshot();
  });

  it('should call onClose method when the button is clicked', () => {
    const onClose = jest.spyOn(component.instance(), 'onClose');
    component.instance().forceUpdate();

    const closer = component.find('div').at(2);
    closer.simulate('click');
    expect(closer.length).toBe(1);
    expect(onClose).toHaveBeenCalled();
  });

  it('should map state to props', () => {
    expect(wrapper.props().alert.alertType).toBe('Danger');
  });

  it('should map dispatch to props', () => {
    wrapper.simulate('removeAlert');

    const actions = store.getActions();
    expect(actions.length).toEqual(1);
  });
});
