import React from 'react';
import { shallow } from 'enzyme';
import App from '../App';

describe('Main Component', () => {
  it('should render without crashing', () => {
    localStorage.setItem('token', 'token');
    const component = shallow(<App />);
    expect(component).toMatchSnapshot();
  });
});
