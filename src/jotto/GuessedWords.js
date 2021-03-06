import React from 'react';
import PropTypes from 'prop-types';

function GuessedWords({ guessedWords }) {
  return (
    <div data-test="component-guessed-words">
      {
        guessedWords.length === 0 ?
          (
            <span data-test="guess-instructions">
              Try to guess the secret word!
            </span>
          ) : (
            <div data-test="guessed-words">
              <h3>Guessed Words</h3>
              <table>
                <thead>
                  <tr>
                    <th>Guess</th>
                    <th>Matching Letters</th>
                  </tr>
                </thead>
                <tbody>
                  {
                    guessedWords.map(word => (
                      <tr key={word} data-test="guessed-word">
                        <td>{word.guessedWord}</td>
                        <td>{word.letterMatchCount}</td>
                      </tr>
                    ))
                  }
                </tbody>
              </table>
            </div>
          )
      }
    </div>
  );
}

GuessedWords.propTypes = {
  guessedWords: PropTypes.arrayOf(
    PropTypes.shape({
      guessedWord: PropTypes.string.isRequired,
      letterMatchCounter: PropTypes.number.isRequired,
    }),
  ).isRequired,
};

export default GuessedWords;
