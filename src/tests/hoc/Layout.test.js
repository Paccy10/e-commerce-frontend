import React from 'react';
import { shallow } from 'enzyme';
import Layout from '../../hoc/Layout/Layout';

const props = {
  children: <div></div>
};

describe('<Layout /> Component', () => {
  it('should render without crashing', () => {
    const component = shallow(<Layout {...props} />);
    expect(component).toMatchSnapshot();
  });
});
