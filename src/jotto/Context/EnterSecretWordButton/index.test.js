import React from 'react';
import { mount } from 'enzyme';

import { findByTestAttr, checkProps } from '../../../testUtils';
import EnterSecretWordButton from '.';
import LanguageContext from '../LanguageContext';
import GuessedWordsContext from '../GuessedWordsContext';

// for testing that setEnterSecretWord is called with true on click
const mockSetEnterSecretWord = jest.fn();

/**
* Create ReactWrapper for EnterSecretWordButton component for testing
* @param {object} testValues - Context and props values for this specific test.
* @returns {ReactWrapper} - Wrapper for EnterSecretWordButton component and providers
*/
const setup = ({ language = 'en' }) => {

  return mount(
    <LanguageContext.Provider value={language}>
      <GuessedWordsContext.GuessedWordsProvider>
        <EnterSecretWordButton setEnterSecretWord={mockSetEnterSecretWord} />
      </GuessedWordsContext.GuessedWordsProvider>
    </LanguageContext.Provider>,
  );
};

describe('render', () => {
  test('renders without error', () => {
    // guessedWords length is 0 by default so we would expect it to render by default
    // We test in integration_tests/enter_secret_word.test.js that it does not render
    // when there are guessedWords
    const wrapper = setup({});
    const component = findByTestAttr(wrapper, 'component-enter-secret-word-button');
    expect(component.length).toBe(1);
  });
});
test('does not throw warning with expected props', () => {
  const expectedProps = { setEnterSecretWord() {} };
  checkProps(EnterSecretWordButton, expectedProps);
});

test('calls setEnterSecretWord with the argument "true" on click', () => {
  const wrapper = setup({ });
  const component = findByTestAttr(wrapper, 'component-enter-secret-word-button');
  component.simulate('click');
  expect(mockSetEnterSecretWord).toHaveBeenCalledWith(true);
});

describe('languagePicker', () => {
  test('correctly renders button text string in english', () => {
    const wrapper = setup({ language: 'en', success: true });
    const component = findByTestAttr(wrapper, 'component-enter-secret-word-button');
    expect(component.text()).toBe('Enter your own secret word');
  });
  test('correctly renders button text string in emoji', () => {
    const wrapper = setup({ language: 'emoji', success: true });
    const component = findByTestAttr(wrapper, 'component-enter-secret-word-button');
    expect(component.text()).toBe('👩‍💻🤫🔤');
  });
});
