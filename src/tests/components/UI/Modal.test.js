import React from 'react';
import { shallow } from 'enzyme';
import Modal from '../../../components/UI/Modal/Modal';

const props = {
  show: true,
  modalClosed: jest.fn()
};

describe('<Modal /> Component', () => {
  const component = shallow(<Modal {...props} />);

  it('should render without crashing', () => {
    expect(component).toMatchSnapshot();
  });

  it('should call componentShouldUpdate', () => {
    component.setProps({ show: true });
    expect(component.instance().props.show).toBe(true);
  });
});
