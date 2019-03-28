import React from 'react';
import { shallow } from 'enzyme';
import Questions from './Questions';

describe('Questions', () => {
  it('matches a snapshot', () => {
    const wrapper = shallow(
      <Questions providerData={'TA Name'}/>
    );
    expect(wrapper).toMatchSnapshot();
  });
});
