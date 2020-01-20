import React from 'react';
import { shallow } from 'enzyme';
import Content from '../../../../containers/Admin/Layout/Content/Content';

const props = {
  children: <div></div>
};

describe('<Content /> Component', () => {
  const component = shallow(<Content {...props} />);

  it('should render without crashing', () => {
    expect(component).toMatchSnapshot();
  });
});
