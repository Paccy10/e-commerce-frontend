import React from 'react';
import { shallow } from 'enzyme';
import Footer from '../../components/Footer/Footer';

describe('<Footer /> Component', () => {
  const component = shallow(<Footer />);

  it('should render without crashing', () => {
    expect(component).toMatchSnapshot();
  });
});
