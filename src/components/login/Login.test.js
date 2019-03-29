import React from 'react';
import { shallow } from 'enzyme';
import Login from './Login';

describe('Questions', () => {
  it('matches a snapshot', () => {
    const wrapper = shallow(
      <Login />
    );
    expect(wrapper).toMatchSnapshot();
  });
});
