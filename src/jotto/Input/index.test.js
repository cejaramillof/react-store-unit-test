import React from 'react';
import { shallow } from 'enzyme';
import Input from '.';
import { checkProps, findByTestAttr } from '../../testUtils';

/*
// Complety mock, when is used with destructuring
const mockSetCurrentGuess = jest.fn();
jest.mock('react', () => ({
  ...jest.requireActual('react'),
  useState: initialState => [initialState, mockSetCurrentGuess],
}));
*/
const defaultProps = { secretWord: 'Party' };

/**
 * Factory function to create a ShallowWrapper for the GuessedWords component.
 * @function setup
 * @param {Object} [initialState={}] - initial state for this setup.
 * @returns {ShallowWrapper}
 */
const setup = (state = defaultProps) => {
  return shallow(<Input {...state} />);
};

let wrapper;
beforeEach(() => {
  wrapper = setup();
});

describe('render', () => {
  test('renders component without error', () => {
    const inputComponent = findByTestAttr(wrapper, 'component-input');
    expect(inputComponent.length).toBe(1);

    const inputBox = findByTestAttr(wrapper, 'input-box');
    expect(inputBox.length).toBe(1);
  });
  test('does not throw warning with expected props', () => {
    const expectedProps = { secretWord: '' };
    checkProps(Input, expectedProps);
  });
});

describe('state controlled input field', () => {
  const mockSetCurrentGuess = jest.fn();
  const originalUseState = React.useState;

  beforeEach(() => {
    mockSetCurrentGuess.mockClear();
    React.useState = jest.fn(() => ['', mockSetCurrentGuess]);
    wrapper = setup();
  });

  afterAll(() => {
    React.useState = originalUseState;
  });

  test('state updated with value of input box upon change', () => {
    // const mockSetCurrentGuess = jest.fn();
    // React.useState = jest.fn(() => ['', mockSetCurrentGuess]);
    // wrapper = setup();

    const inputBox = findByTestAttr(wrapper, 'input-box');

    const mockEvent = { target: { value: 'train' } };
    inputBox.simulate('change', mockEvent);

    expect(mockSetCurrentGuess).toHaveBeenCalledWith('train');
  });
  test('field is cleared upon submit button click', () => {
    const submitButton = findByTestAttr(wrapper, 'submit-button');

    submitButton.simulate('click', { preventDefault: jest.fn() });
    expect(mockSetCurrentGuess).toHaveBeenCalledWith('');
  });
});
