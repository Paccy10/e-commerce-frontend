import React from 'react';
import { shallow } from 'enzyme';
import Logo from '../../components/Logo/Logo';

describe('<Logo /> Component', () => {
  const component = shallow(<Logo />);

  it('should render without crashing', () => {
    expect(component).toMatchSnapshot();
  });
});
