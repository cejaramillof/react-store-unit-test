
import React from 'react';
import { mount } from 'enzyme';
import { findByTestAttr, checkProps } from '../../../testUtils';
import SecretWordReveal from '.';
import LanguageContext from '../LanguageContext';

/**
* Create ReactWrapper for SecretWordReveal component for testing
* @param {object} testValues - Props values for this specific test.
* @returns {ReactWrapper} - Wrapper for SecretWordReveal
*/
const setup = ({ language = 'en', secretWord = 'party' }) => {
  return mount(
    <LanguageContext.Provider value={language}>
      <SecretWordReveal secretWord={secretWord} />
    </LanguageContext.Provider>,
  );
};

test('renders without error', () => {
  const wrapper = setup({});
  const component = findByTestAttr(wrapper, 'component-secret-word-reveal');
  expect(component.length).toBe(1);
});

test('secret word is included in text', () => {
  const wrapper = setup({ secretWord: 'party' });
  const component = findByTestAttr(wrapper, 'component-secret-word-reveal');
  expect(component.text()).toContain('party');
});

test('does not throw warning with expected props', () => {
  const expectedProps = { secretWord: 'party' };
  checkProps(SecretWordReveal, expectedProps);
});

describe('languagePicker', () => {
  test('correctly renders `better luck` string in english', () => {
    const wrapper = setup({ language: 'en' });
    const component = findByTestAttr(wrapper, 'component-secret-word-reveal');
    expect(component.text()).toContain('Better luck next time!');
  });
  test('correctly renders `better luck` string in emoji', () => {
    const wrapper = setup({ language: 'emoji' });
    const component = findByTestAttr(wrapper, 'component-secret-word-reveal');
    expect(component.text()).toContain('🍀✨🔤');
  });
});
