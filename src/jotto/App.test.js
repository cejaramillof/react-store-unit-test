import React from 'react';
import { shallow } from 'enzyme';
import { storeFactory } from './testUtils';
import App, { UnconnectedApp } from './App';

/**
 * Factory function to create a ShallowWrapper for the App component.
 * @function setup
 * @param {Object} [initialState={}] - initial state for this setup.
 * @returns {ShallowWrapper}
 */
const setup = (initialState = {}) => {
  const store = storeFactory(initialState);
  const wrapper = shallow(<App store={store} />).dive().dive();
  return wrapper;
};

describe('redux properties', () => {
  test('has access to `success` state', () => {
    const success = true;
    const wrapper = setup({ success });
    const successProp = wrapper.instance().props.success;
    expect(successProp).toBe(success);
  });
  test('has access to `secretWord` state', () => {
    const secretWord = true;
    const wrapper = setup({ secretWord });
    const secretWordProp = wrapper.instance().props.secretWord;
    expect(secretWordProp).toBe(secretWord);
  });
  test('has access to `guessedWords` state', () => {
    const guessedWords = [{ guessedWord: 'train', letterMatchCount: 3 }];
    const wrapper = setup({ guessedWords });
    const guessedWordsProp = wrapper.instance().props.guessedWords;
    expect(guessedWordsProp).toBe(guessedWords);
  });
  test('`getSecretWord` action creator is a function on the props', () => {
    const wrapper = setup();
    const getSecretWordProp = wrapper.instance().props.getSecretWord;
    expect(getSecretWordProp).toBeInstanceOf(Function);
  });
});

describe('redux properties Unconnected', () => {
  test('`getSecretWord` runs on App mount', () => {
    const getSecretWord = jest.fn();
    const props = {
      getSecretWord,
      success: false,
      guessedWords: [],
    };
    const wrapper = shallow(<UnconnectedApp {...props} />);
    wrapper.instance().componentDidMount(); // run lifecycle method
    const getSecretWordCallCount = getSecretWord.mock.calls.length;
    expect(getSecretWordCallCount).toBe(1);
  });
});
