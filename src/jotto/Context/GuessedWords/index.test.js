import React from 'react';
import GuessedWords from '.';
import { findByTestAttr, setup, checkProps } from '../../../testUtils';

const defaultProps = {
  guessedWords: [{ guessedWord: 'T3STS', letterMatchCount: 2 }],
};

test('does not throw warning with expected props', () => {
  checkProps(GuessedWords, defaultProps);
});

describe('if there are no words guessed', () => {
  let wrapper;

  beforeEach(() => {
    wrapper = setup(GuessedWords, { guessedWords: [] }, defaultProps);
  });

  test('render without error', () => {
    const component = findByTestAttr(wrapper, 'component-guessed-words');
    expect(component.length).toBe(1);
  });

  test('render instructions to guess a word', () => {
    const instructions = findByTestAttr(wrapper, 'guess-instructions');
    expect(instructions.text().length).not.toBe(0);
  });
});

describe('if there are words guessed', () => {
  let wrapper;
  const guessedWords = [
    { guessedWord: 'train', letterMatchCount: 3 },
    { guessedWord: 'agile', letterMatchCount: 1 },
    { guessedWord: 'party', letterMatchCount: 5 },
  ];

  beforeEach(() => {
    wrapper = setup(GuessedWords, { guessedWords }, defaultProps);
  });

  test('render without error', () => {
    const component = findByTestAttr(wrapper, 'component-guessed-words');
    expect(component.length).toBe(1);
  });
  test('renders "guessed words" section', () => {
    const guessedWordsNode = findByTestAttr(wrapper, 'guessed-words');
    expect(guessedWordsNode.length).toBe(1);
  });
  test('correct number of guessed words', () => {
    // console.log(wrapper.debug());
    const guessedWordsNode = findByTestAttr(wrapper, 'guessed-word');
    expect(guessedWordsNode.length).toBe(guessedWords.length);
  });
  test('includes guess word index for each word', () => {
    const guessWordIndexes = findByTestAttr(wrapper, 'guessed-word-index');
    const indexTextSet = new Set(guessWordIndexes.map(wrapper => wrapper.text()));
    const expectedSet = new Set(guessedWords.map((word, index) => (index + 1).toString()));
    expect(indexTextSet).toEqual(expectedSet);
  });
});

describe('languagePicker', () => {
  test('correctly renders guess instructions string in English by default', () => {
    const wrapper = setup(GuessedWords, { guessedWords: [] }, defaultProps);
    const guessInstructions = findByTestAttr(wrapper, 'guess-instructions');
    expect(guessInstructions.text()).toBe('Try to guess the secret word!');
  });

  test('correctly renders guess instructions string in Emoji', () => {
    const mockUseContext = jest.fn().mockReturnValue('emoji');
    React.useContext = mockUseContext;
    const wrapper = setup(GuessedWords, { guessedWords: [] }, defaultProps);
    const guessInstructions = findByTestAttr(wrapper, 'guess-instructions');
    expect(guessInstructions.text()).toBe('🤔🤫🔤');
  });
});
