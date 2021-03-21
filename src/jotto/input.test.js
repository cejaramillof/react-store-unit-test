import React from 'react';
import { mount, shallow, ShallowWrapper } from 'enzyme';

import { Provider } from 'react-redux';
import { findByTestAttr, storeFactory } from './testUtils';
import Input from './Input';

/**
 * Factory function to create a ShallowWrapper for the GuessedWords component.
 * @function setup
 * @param {Object} [initialState={}] - initial state for this setup.
 * @returns {ShallowWrapper}
 */
const setup = (initialState = {}) => {
  const store = storeFactory(initialState);
  const wrapper = shallow(<Input store={store} />).dive().dive();
  // const wrapper = shallow(<Input store={store} />).dive().dive();
  // const wrapper = shallow(<Input store={store} />);
  // console.log(wrapper.debug());
  // console.log(wrapper.dive().debug());
  // console.log(wrapper.dive().dive().debug());
  return wrapper;
};

describe('render', () => {
  describe('word has not been guessed', () => {
    let wrapper;
    beforeEach(() => {
      const initialState = { success: false };
      wrapper = setup(initialState);
    });
    test('renders component without error', () => {
      const component = findByTestAttr(wrapper, 'component-input');
      expect(component.length).toBe(1);
    });
    test('renders input box', () => {
      const component = findByTestAttr(wrapper, 'input-box');
      expect(component.length).toBe(1);
    });
    test('renders submit button', () => {
      const component = findByTestAttr(wrapper, 'submit-button');
      expect(component.length).toBe(1);
    });
  });
  describe('word has been guessed', () => {
    let wrapper;
    beforeEach(() => {
      const initialState = { success: true };
      wrapper = setup(initialState);
    });
    test('renders component without error', () => {
      const component = findByTestAttr(wrapper, 'component-input');
      expect(component.length).toBe(1);
    });
    test('does not renders input box', () => {
      const component = findByTestAttr(wrapper, 'input-box');
      expect(component.length).toBe(0);
    });
    test('does not render submit button', () => {
      const component = findByTestAttr(wrapper, 'submit-button');
      expect(component.length).toBe(0);
    });
  });
  describe('redux props', () => {
    test('has success piece of state as prop', () => {
      const success = true;
      const wrapper = setup({ success });
      const successProp = wrapper.instance().props.success;
      expect(successProp).toBe(success);
    });
    test('`guessWord` action creator is a function prop', () => {
      const wrapper = setup();
      const guessWordProp = wrapper.instance().props.guessWord;
      expect(guessWordProp).toBeInstanceOf(Function);

    });
    test('renders submit button', () => {

    });
  });
});
