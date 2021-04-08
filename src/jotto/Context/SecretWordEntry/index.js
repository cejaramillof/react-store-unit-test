import React from 'react';
import PropTypes from 'prop-types';

import stringsModule from '../../helpers/strings';
import LanguageContext from '../LanguageContext';

/**
 * Functional react component for reset button.
 * @function
 * @param {object} props - React props.
 * @returns {JSX.Element} - Rendered component (or null if `success` context is false).
 */
export default function SecretWordEntry({ setEnterSecretWord, setSecretWord }) {
  const language = React.useContext(LanguageContext);
  const [customSecretWord, setCustomSecretWord] = React.useState();

  return (
    <div
      data-test="component-secret-word-entry"
    >
      <form className="form-inline">
        <input
          data-test="secret-word-input-box"
          type="text"
          value={customSecretWord}
          onChange={evt => setCustomSecretWord(evt.target.value)}
        />
        <button
          type="button"
          data-test="submit-secret-word-button"
          className="btn btn-primary mb-2"
          onClick={(evt) => {
            evt.preventDefault();
            setEnterSecretWord(false);
            setSecretWord(customSecretWord);
            setCustomSecretWord('');
          }
          }
        >
          {stringsModule.getStringByLanguage(language, 'enterSecretWord')}
        </button>
      </form>
    </div>
  );
}

SecretWordEntry.propTypes = {
  setEnterSecretWord: PropTypes.func.isRequired,
  setSecretWord: PropTypes.func.isRequired,
};
