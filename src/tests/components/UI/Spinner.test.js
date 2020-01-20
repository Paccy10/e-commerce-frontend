import React from 'react';
import { shallow } from 'enzyme';
import Spinner from '../../../components/UI/Spinner/Spinner';

describe('<Spinner /> Component', () => {
  const component = shallow(<Spinner />);

  it('should render without crashing', () => {
    expect(component).toMatchSnapshot();
  });
});
