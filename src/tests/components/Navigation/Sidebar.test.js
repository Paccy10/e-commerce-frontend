import React from 'react';
import { shallow } from 'enzyme';
import Sidebar from '../../../components/Navigation/Sidebar/Sidebar';

describe('<Sidebar /> Component', () => {
  const component = shallow(<Sidebar />);

  it('should render without crashing', () => {
    expect(component).toMatchSnapshot();
  });
});
