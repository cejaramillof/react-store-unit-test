import React from 'react';
import { shallow } from 'enzyme';
import Input, { UnconnectedInput } from '.';
import { findByTestAttr, storeFactory } from '../../../testUtils';

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
    test('renders "give up" button', () => {
      const giveUpButton = findByTestAttr(wrapper, 'give-up-button');
      expect(giveUpButton.length).toBe(1);
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
});

test('calls `giveUp` prop upon "Give Up" button click', () => {
  const giveUpMock = jest.fn();
  const wrapper = shallow(<UnconnectedInput giveUp={giveUpMock} />);
  const giveUpButton = findByTestAttr(wrapper, 'give-up-button');

  giveUpButton.simulate('click', { preventDefault() {} });

  expect(giveUpMock.mock.calls.length).toBe(1);
});

describe('`guessWord` action creator call', () => {
  let guessWordMock;
  let wrapper;
  const guessedWord = 'train';
  beforeEach(() => {
    guessWordMock = jest.fn();
    const props = { guessWord: guessWordMock };
    wrapper = shallow(<UnconnectedInput {...props} />);

    // wrapper.setState({ currentGuess: guessedWord });
    wrapper.instance().inputBox.current = { value: guessedWord };

    const submitButton = findByTestAttr(wrapper, 'submit-button');
    submitButton.simulate('click', { preventDefault: jest.fn() });
  });

  test('calls `guessWord` when button is clicked', () => {
    const guessWordCallCount = guessWordMock.mock.calls.length;
    expect(guessWordCallCount).toBe(1);
  });

  test('calls `guessWord` with input value as argument', () => {
    const guessWordArg = guessWordMock.mock.calls[0][0];
    expect(guessWordArg).toBe(guessedWord);
  });

  test('input box clears on submit', () => {
    // expect(wrapper.state('currentGuess')).toBe('');
    expect(wrapper.instance().inputBox.current.value).toBe('');
  });
});
