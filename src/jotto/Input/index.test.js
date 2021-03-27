import React from 'react';
import { shallow } from 'enzyme';
import Input from '.';
import { findByTestAttr } from '../../testUtils';

/**
 * Factory function to create a ShallowWrapper for the GuessedWords component.
 * @function setup
 * @param {Object} [initialState={}] - initial state for this setup.
 * @returns {ShallowWrapper}
 */
const setup = (initialState = {}) => {
  const wrapper = shallow(<Input />);
  return wrapper;
};

describe('render', () => {
  let wrapper;
  beforeEach(() => {
    wrapper = setup();
  });
  test('renders component without error', () => {
    const inputComponent = findByTestAttr(wrapper, 'component-input');
    expect(inputComponent.length).toBe(1);
  });
});
