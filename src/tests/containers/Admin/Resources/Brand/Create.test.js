import React from 'react';
import { shallow } from 'enzyme';
import Create from '../../../../../containers/Admin/Resources/Brand/Create/Create';

describe('<Create /> Component (Brand)', () => {
  const component = shallow(<Create />);

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
      target: { value: 'name' }
    };
    const input = component.find('Input').at(0);
    input.simulate('change', event);
    expect(input.length).toBe(1);
    expect(inputChangeHandler).toHaveBeenCalled();
  });
});
