import React from 'react';
import { shallow } from 'enzyme';
import SortForm from './SortForm';

describe('SortForm', () => {
  it('matches a snapshot', () => {
    const wrapper = shallow(
      <SortForm handleChange={jest.fn()}/>
    );
    expect(wrapper).toMatchSnapshot();
  });
});
