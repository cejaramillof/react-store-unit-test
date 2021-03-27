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

/**
 * Factory function to create a ShallowWrapper for the GuessedWords component.
 * @function setup
 * @param {Object} [initialState={}] - initial state for this setup.
 * @returns {ShallowWrapper}
 */
const setup = (success = false, secretWord = 'Party') => {
  return shallow(<Input
    success={success}
    secretWord={secretWord}
  />);
};

describe('render', () => {
  let wrapper;
  describe('success is true', () => {
    beforeEach(() => {
      wrapper = setup(true);
    });
    test('renders component without error', () => {
      const inputComponent = findByTestAttr(wrapper, 'component-input');
      expect(inputComponent.length).toBe(1);
    });
    test('input box does not show', () => {
      const inputBox = findByTestAttr(wrapper, 'input-box');
      expect(inputBox.length).toBe(0);
      expect(inputBox.exists()).toBeFalsy();
      expect(inputBox.exists()).toBe(false);
    });
    test('submit button does not show', () => {
      const submitButton = findByTestAttr(wrapper, 'submit-button');
      expect(submitButton.length).toBe(0);
      expect(submitButton.exists()).toBeFalsy();
      expect(submitButton.exists()).toBe(false);
    });
  });

  describe('success is false', () => {
    beforeEach(() => {
      wrapper = setup();
    });
    test('renders component without error', () => {
      const inputComponent = findByTestAttr(wrapper, 'component-input');
      expect(inputComponent.length).toBe(1);
    });
    test('input box shows', () => {
      const inputBox = findByTestAttr(wrapper, 'input-box');
      expect(inputBox.length).toBe(1);
      expect(inputBox.exists()).toBeTruthy();
      expect(inputBox.exists()).toBe(true);
    });
    test('submit button shows', () => {
      const submitButton = findByTestAttr(wrapper, 'submit-button');
      expect(submitButton.length).toBe(1);
      expect(submitButton.exists()).toBeTruthy();
      expect(submitButton.exists()).toBe(true);
    });
  });

  test('does not throw warning with expected props', () => {
    wrapper = setup();
    const expectedProps = { secretWord: '' };
    checkProps(Input, expectedProps);
  });
});

describe('state controlled input field', () => {
  const mockSetCurrentGuess = jest.fn();
  const originalUseState = React.useState;
  let wrapper;

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
