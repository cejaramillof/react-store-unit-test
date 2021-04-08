import React from 'react';
import { mount } from 'enzyme';

import { findByTestAttr, checkProps } from '../../../testUtils';
import GiveUpButton from '.';
import LanguageContext from '../LanguageContext';
import SuccessContext from '../SuccessContext';

const mockSetGivenUp = jest.fn();

/**
* Create ReactWrapper for GiveUpButton component for testing
* @param {object} testValues - Context and props values for this specific test.
* @returns {ReactWrapper} - Wrapper for GiveUpButton component and providers
*/
const setup = ({ language = 'en' }) => {

  return mount(
    <LanguageContext.Provider value={language}>
      <SuccessContext.SuccessProvider>
        <GiveUpButton setGivenUp={mockSetGivenUp} />
      </SuccessContext.SuccessProvider>
    </LanguageContext.Provider>,
  );
};

describe('render', () => {
  test('renders without error', () => {
    const wrapper = setup({});
    const component = findByTestAttr(wrapper, 'component-give-up-button');
    expect(component.length).toBe(1);
  });
});
test('does not throw warning with expected props', () => {
  const expectedProps = { setGivenUp() {} };
  checkProps(GiveUpButton, expectedProps);
});

test('calls setGivenUp with the argument "true" on click', () => {
  const wrapper = setup({ });
  const component = findByTestAttr(wrapper, 'component-give-up-button');
  component.simulate('click');
  expect(mockSetGivenUp).toHaveBeenCalledWith(true);
});

describe('languagePicker', () => {
  test('correctly renders button text string in english', () => {
    const wrapper = setup({ language: 'en', success: true });
    const component = findByTestAttr(wrapper, 'component-give-up-button');
    expect(component.text()).toBe('Give Up');
  });
  test('correctly renders button text string in emoji', () => {
    const wrapper = setup({ language: 'emoji', success: true });
    const component = findByTestAttr(wrapper, 'component-give-up-button');
    expect(component.text()).toBe('😩');
  });
});
