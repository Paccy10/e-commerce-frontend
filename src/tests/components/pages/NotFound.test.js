import React from 'react';
import { shallow } from 'enzyme';
import NotFound from '../../../components/pages/NotFound/NotFound';

const props = {
  history: { push: jest.fn() }
};

describe('<NotFound /> Component', () => {
  const component = shallow(<NotFound {...props} />);

  it('should render without crashing', () => {
    expect(component).toMatchSnapshot();
  });

  it('should call goToHomepage method when the button is clicked', () => {
    const button = component.find('Button').at(0);
    button.simulate('click');
    expect(button.length).toBe(1);
    expect(props.history.push).toHaveBeenCalled();
  });
});
