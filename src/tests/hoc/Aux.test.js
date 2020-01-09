import React from 'react';
import { shallow } from 'enzyme';
import Aux from '../../hoc/Aux/Aux';

describe('<Aux /> Component', () => {
  it('should render without crashing', () => {
    const component = shallow(<Aux />);
    expect(component).toMatchSnapshot();
  });
});
