import React from 'react';
import { shallow } from 'enzyme';
import TA from './TA';

describe('TA', () => {
  it('matches a snapshot', () => {
    const wrapper = shallow(
      <TA name={'TA Name'}
        cohort={'FSFJ 2020'}
        id={'1234'}
        claims={2}
        handleDelete={jest.fn()}
      />
    );
    expect(wrapper).toMatchSnapshot();
  });
});
