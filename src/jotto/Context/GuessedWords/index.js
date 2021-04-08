import React from 'react';
import GuessedWordsContext from '../GuessedWordsContext';
import stringsModule from '../../helpers/strings';
import LanguageContext from '../LanguageContext';

const GuessedWords = () => {
  const [guessedWords] = GuessedWordsContext.useGuessedWords();
  const language = React.useContext(LanguageContext);
  let contents;
  if (guessedWords.length === 0) {
    contents = (
      <span data-test="guess-instructions">
        {stringsModule.getStringByLanguage(language, 'guessPrompt')}
      </span>
    );
  } else {
    const guessedWordsRows = guessedWords.map((word, index) => (
      <tr data-test="guessed-word" key={index}>
        <td data-test="guessed-word-index">{ index + 1 }</td>
        <td>{ word.guessedWords }</td>
        <td>{ word.letterMatchCounter }</td>
      </tr>
    ));
    contents = (
      <div data-test="guessed-words">
        <h3>{stringsModule.getStringByLanguage(language, 'guessedWords')}</h3>
        <table className="table table-sm">
          <thead className="thead-light">
            <tr>
              <th>{stringsModule.getStringByLanguage(language, 'numberColumnHeader')}</th>
              <th>{stringsModule.getStringByLanguage(language, 'guessColumnHeader')}</th>
              <th>{stringsModule.getStringByLanguage(language, 'matchingLettersColumnHeader')}</th>
            </tr>
          </thead>
          <tbody>
            { guessedWordsRows }
          </tbody>
        </table>
        <div data-test="total-guesses">
          {stringsModule.getStringByLanguage(language, 'totalGuesses')}
          :
          {' '}
          {guessedWords.length}
        </div>
      </div>
    );
  }
  return (
    <div data-test="component-guessed-words">
      { contents }
    </div>
  );
};

export default GuessedWords;
