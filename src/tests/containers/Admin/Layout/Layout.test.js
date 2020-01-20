import React from 'react';
import { shallow } from 'enzyme';
import Layout from '../../../../containers/Admin/Layout/Layout';

const props = {
  children: <div></div>
};

describe('<Layout /> Component', () => {
  const component = shallow(<Layout {...props} />);

  it('should render without crashing', () => {
    expect(component).toMatchSnapshot();
  });
});
