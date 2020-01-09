import React from 'react';
import { shallow } from 'enzyme';
import Toolbar from '../../../components/Navigation/Toolbar/Toolbar';

const props = {
  showMenu: true
};

describe('<Toolbar /> Component', () => {
  const component = shallow(<Toolbar {...props} />);

  it('should render without crashing', () => {
    expect(component).toMatchSnapshot();
  });
});
