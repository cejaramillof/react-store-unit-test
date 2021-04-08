import React from 'react';
import PropTypes from 'prop-types';

import stringsModule from '../../helpers/strings';
import hookActions from '../actions';
import GuessedWordsContext from '../GuessedWordsContext';
import SuccessContext from '../SuccessContext';
import LanguageContext from '../LanguageContext';

/**
 * Functional react component for reset button.
 * @function
 * @param {object} props - React props.
 * @returns {JSX.Element} - Rendered component (or null if `success` context is false).
 */
export default function NewWordButton(props) {
  const language = React.useContext(LanguageContext);

  const [guessedWords, setGuessedWords] = GuessedWordsContext.useGuessedWords();
  const [success, setSuccess] = SuccessContext.useSuccess();
  const resetGame = (setSecretWord, setGivenUp) => {

    hookActions.getSecretWord(setSecretWord);

    setGuessedWords([]);

    setSuccess(false);

    setGivenUp(false);
  };

  if (success) {
    return (
      <button
        type="button"
        data-test="component-new-word-button"
        className="btn btn-primary mb-2"
        onClick={() => resetGame(props.setSecretWord, props.setGivenUp)}
      >
        {stringsModule.getStringByLanguage(language, 'newWord')}
      </button>
    );
  }

  return <div data-test="component-new-word-button" />;

}

NewWordButton.propTypes = {
  setSecretWord: PropTypes.func.isRequired,
  setGivenUp: PropTypes.func.isRequired,
};
