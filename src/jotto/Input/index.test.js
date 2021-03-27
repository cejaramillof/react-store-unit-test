import React from 'react';
import { shallow } from 'enzyme';
import Input from '.';
import { checkProps, findByTestAttr } from '../../testUtils';

const defaultProps = { secretWord: 'Party' };

/**
 * Factory function to create a ShallowWrapper for the GuessedWords component.
 * @function setup
 * @param {Object} [initialState={}] - initial state for this setup.
 * @returns {ShallowWrapper}
 */
const setup = (state = defaultProps) => {
  const wrapper = shallow(<Input {...state} />);
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
  test('does not throw warning with expected props', () => {
    const expectedProps = { secretWord: '' };
    checkProps(Input, expectedProps);
  });
});
