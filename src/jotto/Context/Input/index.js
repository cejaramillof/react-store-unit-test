import React from 'react';
import PropTypes from 'prop-types';
import LanguageContext from '../LanguageContext';
import stringsModule from '../../helpers/strings';
import SuccessContext from '../SuccessContext';
import GuessedWordsContext from '../GuessedWordsContext';
import { getLetterMatchCount } from '../../helpers';

function Input({ secretWord }) {
  const [currentGuess, setCurrentGuess] = React.useState('');
  const language = React.useContext(LanguageContext);
  const [guessedWords, setGuessedWords] = GuessedWordsContext.useGuessedWords();
  const [success, setSuccess] = SuccessContext.useSuccess();

  if (success) { return null; }

  return (
    <div data-test="component-input">
      <form action="" className="form-inline">
        <input
          type="text"
          data-test="input-box"
          className="mb-2 mx-sm-3"
          placeholder={stringsModule.getStringByLanguage(language, 'guessInputPlaceholder')}
          value={currentGuess}
          onChange={evt => setCurrentGuess(evt.target.value)}
        />
        <button
          type="submit"
          data-test="submit-button"
          className="btn btn-primary mb-2"
          onClick={(evt) => {
            evt.preventDefault();
            const letterMatchCounter = getLetterMatchCount(currentGuess, secretWord);
            const newGuessedWords = [
              ...guessedWords,
              { guessedWords: currentGuess, letterMatchCounter },
            ];
            setGuessedWords(newGuessedWords);
            if (currentGuess === secretWord) setSuccess(true);
            setCurrentGuess('');
          }}
        >
          {stringsModule.getStringByLanguage(language, 'submit')}
        </button>
      </form>
    </div>
  );
}

Input.propTypes = {
  secretWord: PropTypes.string.isRequired,
};

export default Input;
