import React from 'react';
import { shallow } from 'enzyme';
import TAForm from './TAForm';

describe('TAForm', () => {
  it('matches a snapshot', () => {
    const wrapper = shallow(
      <TAForm user={'User Name'}
        handleSubmit={jest.fn()}
      />
    );
    expect(wrapper).toMatchSnapshot();
  });
});
