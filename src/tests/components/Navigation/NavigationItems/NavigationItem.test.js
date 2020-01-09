import React from 'react';
import { shallow } from 'enzyme';
import NavigationItem from '../../../../components/Navigation/NavigationItems/NavigationItem/NavigationItem';

const props = {
  link: '/',
  children: <li>Home</li>
};

describe('<NavigationItem /> Component', () => {
  const component = shallow(<NavigationItem {...props} />);

  it('should render without crashing', () => {
    expect(component).toMatchSnapshot();
  });
});
