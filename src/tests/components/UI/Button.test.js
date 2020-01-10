import React from 'react';
import { shallow } from 'enzyme';
import Button from '../../../components/UI/Button/Button';

const props = {
  btnType: 'Primary',
  clicked: jest.fn(),
  children: 'Submit'
};

describe('<Button /> Component', () => {
  const component = shallow(<Button {...props} />);

  it('should render without crashing', () => {
    expect(component).toMatchSnapshot();
  });
});
