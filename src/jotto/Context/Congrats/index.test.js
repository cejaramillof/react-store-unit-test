import React from 'react';
import { mount } from 'enzyme';
import Congrats from '.';
import { findByTestAttr } from '../../../testUtils';
import LanguageContext from '../LanguageContext';
import SuccessContext from '../SuccessContext';

/**
 * Factory function to create a ShallowWrapper for the Congrats component.
 * @function setup
 * @param {object} [testValues] - Context values specific to this setup.
 * @returns {ShallowWrapper}
 */
const setup = ({ success = false, language = 'en' }) => {
  // language = language || 'en';

  return mount(
    <LanguageContext.Provider value={language}>
      <SuccessContext.SuccessProvider value={[success, jest.fn()]}>
        <Congrats />
      </SuccessContext.SuccessProvider>
    </LanguageContext.Provider>,
  );
};

describe('languagePicker', () => {
  test('correctly renders congrats string in english', () => {
    const wrapper = setup({ success: true });
    expect(wrapper.text()).toBe('Congratulations! You guessed the word!');
  });
  test('correctly renders congrats string in emoji', () => {
    const wrapper = setup({ success: true, language: 'emoji' });
    expect(wrapper.text()).toBe('🎯🎉');
  });
});

test('render without error', () => {
  const wrapper = setup({});
  const component = findByTestAttr(wrapper, 'component-congrats');
  expect(component.length).toBe(1);
});

test('render no text when `success` is false', () => {
  const wrapper = setup({ success: false });
  const component = findByTestAttr(wrapper, 'component-congrats');
  expect(component.text()).toBe('');
});

test('render non-empty congrats message when `success` is true', () => {
  const wrapper = setup({ success: true });
  const message = findByTestAttr(wrapper, 'congrats-message');
  expect(message.length).not.toBe(0);
  expect(message.text().length).not.toBe(0);
});
