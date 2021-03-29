import React from 'react';
import { mount } from 'enzyme';

import App from '.';
import { findByTestAttr } from '../../../testUtils';

/**
 * Create wrapper with specified initial conditions,
 * then submit a guessed word of 'train'
 * @function setup
 * @param {Object} state- initial conditions
 * @returns {Wrapper} - Enzyme wrapper of mounted App Component
 */
const setup = (state = {}) => {

  // TODO: apply state
  const wrapper = mount(<App />);

  const inputBox = findByTestAttr(wrapper, 'input-box');
  inputBox.simulate('change', { target: { value: 'train' } });

  const submitButton = findByTestAttr(wrapper, 'submit-button');
  submitButton.simulate('click', { preventDefault() {} });

  return wrapper;
};

// JEST (describe-test): .only, .skip
// .todo // Only will works with test, will skip the function to only send the description

describe('invalid word guessed', () => {
  test.todo('guessedWords table does not get another row');
});

describe.skip('no words guessed', () => {
  let wrapper;
  beforeEach(() => {
    wrapper = setup({
      secretWord: 'party',
      success: false,
      guessedWords: [],
    });
  });

  test('creates GuessedWords table with one row', () => {
    const guessedWordRows = findByTestAttr(wrapper, 'guessed-word');
    expect(guessedWordRows).toHaveLength(1);
  });
});

describe.skip('some words guessed', () => {
  let wrapper;
  beforeEach(() => {
    wrapper = setup({
      secretWord: 'party',
      success: false,
      guessedWords: [{ guessedWord: 'agile', lettetMatchCount: 1 }],
    });
  });

  test('add row to guessedWords table', () => {
    const guessedWordNodes = findByTestAttr(wrapper, 'guessed-word');
    expect(guessedWordNodes).toHaveLength(2);
  });
});

describe.skip('guess secret word', () => {
  let wrapper;
  beforeEach(() => {
    wrapper = setup({
      secretWord: 'party',
      success: false,
      guessedWords: [{ guessedWord: 'agile', lettetMatchCount: 1 }],
    });
  });

  test('add row to guessedWords table', () => {
    const guessedWordNodes = findByTestAttr(wrapper, 'guessed-word');
    expect(guessedWordNodes).toHaveLength(3);
  });
  test('displays congrats component', () => {
    const congrats = findByTestAttr(wrapper, 'component-congrats');
    expect(congrats.text().length).toBeGreaterThan(0);
  });

  test('does not display input component contents', () => {
    const inputBox = findByTestAttr(wrapper, 'input-box');
    expect(inputBox.exists()).toBe(false);

    const submitButton = findByTestAttr(wrapper, 'submit-button');
    expect(submitButton.exists()).toBe(false);
  });
});
