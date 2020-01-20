import React from 'react';
import { shallow } from 'enzyme';
import Dashboard from '../../../containers/Admin/Dashboard/Dashboard';

describe('<Dashboard /> Component', () => {
  const component = shallow(<Dashboard />);

  it('should render without crashing', () => {
    expect(component).toMatchSnapshot();
  });
});
