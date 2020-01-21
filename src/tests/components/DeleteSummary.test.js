import React from 'react';
import { shallow } from 'enzyme';
import DeleteSummary from '../../components/DeleteSummary/DeleteSummary';

const props = {
  children: <div></div>,
  cancelHandler: jest.fn(),
  continueHandler: jest.fn()
};

describe('<DeleteSummary /> Component', () => {
  const component = shallow(<DeleteSummary {...props} />);

  it('should render without crashing', () => {
    expect(component).toMatchSnapshot();
  });
});
