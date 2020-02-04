import React from 'react';
import { shallow } from 'enzyme';
import { Home } from '../../containers/Pages/Home/Home';

const props = {
  products: []
};

describe('<Home /> Component', () => {
  const component = shallow(<Home {...props} />);

  it('should render without crashing', () => {
    expect(component).toMatchSnapshot();
  });
});
