import React from 'react';
import { shallow } from 'enzyme';
import Home from '../../containers/Home/Home';

describe('<Home /> Component', () => {
  const component = shallow(<Home />);

  it('should render without crashing', () => {
    expect(component).toMatchSnapshot();
  });
});
