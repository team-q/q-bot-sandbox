import React from 'react';
import { shallow } from 'enzyme';
import TAList from './TAList';

describe('TAList', () => {
  it('matches a snapshot', () => {
    const wrapper = shallow(
      <TAList handleDelete={jest.fn()}
      />
    );
    expect(wrapper).toMatchSnapshot();
  });
});
