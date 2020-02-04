import React from 'react';
import { shallow } from 'enzyme';
import { Dashboard } from '../../../containers/Admin/Dashboard/Dashboard';

const props = {
  categories: [],
  brands: []
};

describe('<Dashboard /> Component', () => {
  const component = shallow(<Dashboard {...props} />);

  it('should render without crashing', () => {
    expect(component).toMatchSnapshot();
  });
});
