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
  // const wrapper = shallow(<Input store={store} />);
  // console.log(wrapper.debug());
  // console.log(wrapper.dive().debug());
  // console.log(wrapper.dive().dive().debug());
  return wrapper;
};

describe('render', () => {
  describe('word has not been guessed', () => {
    test('renders component without error', () => {
      // setup();
    });
    test('renders input box', () => {

    });
    test('renders submit button', () => {

    });
  });
  describe('word has been guessed', () => {
    test('renders component without error', () => {

    });
    test('does not renders input box', () => {

    });
    test('does not render submit button', () => {

    });
  });
  describe('update state', () => {
    test('renders component without error', () => {

    });
    test('renders input box', () => {

    });
    test('renders submit button', () => {

    });
  });
});
