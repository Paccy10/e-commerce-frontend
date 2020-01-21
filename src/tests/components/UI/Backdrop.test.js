import React from 'react';
import { shallow } from 'enzyme';
import Backdrop from '../../../components/UI/Backdrop/Backdrop';

const props = {
  show: true,
  clicked: jest.fn()
};

describe('<Backdrop /> Component', () => {
  const component = shallow(<Backdrop {...props} />);

  it('should render without crashing', () => {
    expect(component).toMatchSnapshot();
  });
});
