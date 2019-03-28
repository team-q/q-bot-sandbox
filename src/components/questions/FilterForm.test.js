import React from 'react';
import { shallow } from 'enzyme';
import FilterForm from './FilterForm';

describe('FilterForm', () => {
  it('matches a snapshot', () => {
    const wrapper = shallow(
      <FilterForm value={'TA'} onChange={jest.fn()}/>
    );
    expect(wrapper).toMatchSnapshot();
  });
});
