import React from 'react';
import { mount } from 'enzyme';
import { findByTestAttr } from '../../../testUtils';
import ServerError from '.';
import LanguageContext from '../LanguageContext';

/**
* Create ReactWrapper for ServerError component for testing
* @param {object} testValues - Props values for this specific test.
* @returns {ReactWrapper} - Wrapper for ServerError
*/
const setup = ({ language = 'en' }) => {
  return mount(
    <LanguageContext.Provider value={language}>
      <ServerError />
    </LanguageContext.Provider>,
  );
};

test('renders without error', () => {
  const wrapper = setup({});
  const component = findByTestAttr(wrapper, 'component-server-error');
  expect(component.length).toBe(1);
});

describe('languagePicker', () => {
  test('correctly renders `better luck` string in english', () => {
    const wrapper = setup({ language: 'en' });
    const component = findByTestAttr(wrapper, 'component-server-error');
    expect(component.text()).toContain('There was an error retrieving the secret word. Please try again later.');
  });
  test('correctly renders `better luck` string in emoji', () => {
    const wrapper = setup({ language: 'emoji' });
    const component = findByTestAttr(wrapper, 'component-server-error');
    expect(component.text()).toContain('🚨. ⏲.');
  });
});
