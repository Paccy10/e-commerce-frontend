import React from 'react';
import { shallow } from 'enzyme';
import NavigationItems from '../../../../components/Navigation/NavigationItems/NavigationItems';

describe('<NavigationItems /> Component', () => {
  const component = shallow(<NavigationItems />);

  it('should render without crashing', () => {
    expect(component).toMatchSnapshot();
  });
});
