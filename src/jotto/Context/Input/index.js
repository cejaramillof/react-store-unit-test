import React from 'react';
// import React, { useState } from 'react';
// import PropTypes from 'prop-types';
import LanguageContext from '../LanguageContext';
import stringsModule from '../../helpers/strings';

function Input({ success }) {
  const [currentGuess, setCurrentGuess] = React.useState('');
  const language = React.useContext(LanguageContext);

  const contents = success ? null : (
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
          // TODO: update guessedWords
          // TODO: check against secretWord and update success
          setCurrentGuess('');
        }}
      >
        {stringsModule.getStringByLanguage(language, 'submit')}
      </button>
    </form>
  );

  return <div data-test="component-input">{contents}</div>;
}
/*
Input.propTypes = {
  secretWord: PropTypes.string.isRequired,
};
*/
export default Input;
