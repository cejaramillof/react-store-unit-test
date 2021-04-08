import React from 'react';
import PropTypes from 'prop-types';

import stringsModule from '../../helpers/strings';
import LanguageContext from '../LanguageContext';
import GuessedWordsContext from '../GuessedWordsContext';

/**
 * Functional react component for reset button.
 * @function
 * @param {object} props - React props.
 * @returns {JSX.Element} - Rendered component (or null if `success` context is false).
 */
export default function EnterSecretWordButton({ setEnterSecretWord }) {
  const language = React.useContext(LanguageContext);
  const [guessedWords] = GuessedWordsContext.useGuessedWords();

  if (guessedWords.length > 0) {
    return (<div data-test="component-secret-word-entry" />);
  }

  return (
    <button
      type="button"
      data-test="component-enter-secret-word-button"
      className="btn btn-primary mb-2"
      onClick={() => setEnterSecretWord(true)}
    >
      {stringsModule.getStringByLanguage(language, 'enterSecretWord')}
    </button>
  );
}

EnterSecretWordButton.propTypes = {
  setEnterSecretWord: PropTypes.func.isRequired,
};
