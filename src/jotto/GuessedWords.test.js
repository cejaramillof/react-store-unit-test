import GuessedWords from './GuessedWords';
import { findByTestAttr, setup, checkProps } from '../testUtils';

const defaultProps = {
  guessedWords: [{ guessedWord: 'T3STS', letterMatchCounter: 2 }],
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
    { guessedWord: 'train', letterMatchCounter: 3 },
    { guessedWord: 'agile', letterMatchCounter: 1 },
    { guessedWord: 'party', letterMatchCounter: 5 },
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
});
