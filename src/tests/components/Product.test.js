import React from 'react';
import { shallow } from 'enzyme';
import Product from '../../components/Product/Product';

describe('<Product /> Component', () => {
  const component = shallow(<Product />);

  it('should render without crashing', () => {
    expect(component).toMatchSnapshot();
  });
});
