import React from 'react';
import { mount } from 'enzyme';
import { findByTestAttr } from '../../../testUtils';

import Input from '../Input';
import GuessedWords from '../GuessedWords';
import GuessedWordsContext from '../GuessedWordsContext';
import SuccessContext from '../SuccessContext';

/**
 * Factory function to create a Wrapper for the App component.
 * @function setup
 * @param {Array} guessedWordsStrings - desired secretWord state value for test
 * @param {string} secretWord - desired secretWord state value for test
 * @returns {ReactWrapper}
 */
function setup(guessedWordsStrings = [], secretWord = 'party') {
  const wrapper = mount(
    <GuessedWordsContext.GuessedWordsProvider>
      <SuccessContext.SuccessProvider>
        <Input secretWord={secretWord} />
        <GuessedWords />
      </SuccessContext.SuccessProvider>
    </GuessedWordsContext.GuessedWordsProvider>,
  );

  const inputBox = findByTestAttr(wrapper, 'input-box');
  const submitButton = findByTestAttr(wrapper, 'submit-button');

  guessedWordsStrings.map((word) => {
    const mockEvent = { target: { value: word } };
    inputBox.simulate('change', mockEvent);
    submitButton.simulate('click');
  });
  return [wrapper, inputBox, submitButton];
}

describe('test word guesses', () => {
  let wrapper;
  let inputBox;
  let submitButton;

  describe('non-empty guessedWords', () => {
    beforeEach(() => {
      [wrapper, inputBox, submitButton] = setup(['agile'], 'party');
    });
    describe('correct guess', () => {
      beforeEach(() => {
        const mockEvent = { target: { value: 'party' } };
        inputBox.simulate('change', mockEvent);
        submitButton.simulate('click');
      });
      test('Input component contains no children', () => {
        const inputComponent = findByTestAttr(wrapper, 'component-input');
        expect(inputComponent.children().length).toBe(0);
      });
      test('GuessedWords table row count reflects updated guess', () => {
        const guessedWordsTableRows = findByTestAttr(wrapper, 'guessed-word');
        expect(guessedWordsTableRows.length).toBe(2);
      });
    });
    describe('incorrect guess', () => {
      beforeEach(() => {
        const mockEvent = { target: { value: 'train' } };
        inputBox.simulate('change', mockEvent);
        submitButton.simulate('click');
      });
      test('Input box remains', () => {
        expect(inputBox.exists()).toBe(true);
      });
      test('GuessedWords table row count reflects updated guess', () => {
        const guessedWordsTableRows = findByTestAttr(wrapper, 'guessed-word');
        expect(guessedWordsTableRows.length).toBe(2);
      });
    });
  });
  describe('empty guessWords', () => {
    beforeEach(() => {
      [wrapper, inputBox, submitButton] = setup([], 'party');
    });
    test('guessedWords shows correct guesses after incorrect guess', () => {
      const mockEvent = { target: { value: 'train' } };
      inputBox.simulate('change', mockEvent);
      submitButton.simulate('click');
      const guessedWordsTableRows = findByTestAttr(wrapper, 'guessed-word');
      expect(guessedWordsTableRows.length).toBe(1);
    });
  });
});
