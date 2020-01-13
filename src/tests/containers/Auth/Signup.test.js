import React from 'react';
import { shallow } from 'enzyme';
import Signup from '../../../containers/Auth/Signup/Signup';

describe('<Signup /> Component', () => {
  const component = shallow(<Signup />);

  it('should render without crashing', () => {
    expect(component).toMatchSnapshot();
  });

  it('should call inputChangeHandler method when the input value is changed', () => {
    const inputChangeHandler = jest.spyOn(
      component.instance(),
      'inputChangeHandler'
    );
    component.instance().forceUpdate();

    const event = {
      target: { value: 'email' }
    };

    const input = component.find('Input').at(0);
    input.simulate('change', event);
    expect(input.length).toBe(1);
    expect(inputChangeHandler).toHaveBeenCalled();
  });
});
