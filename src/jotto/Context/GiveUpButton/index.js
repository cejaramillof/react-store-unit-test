import React from 'react';
import PropTypes from 'prop-types';

import stringsModule from '../../helpers/strings';
import LanguageContext from '../LanguageContext';
import SuccessContext from '../SuccessContext';

/**
 * Functional react component for reset button.
 * @function
 * @param {object} props - React props.
 * @returns {JSX.Element} - Rendered component (or null if `success` context is false).
 */
export default function GiveUpButton({ setGivenUp }) {
  const language = React.useContext(LanguageContext);
  const [success, setSuccess] = SuccessContext.useSuccess();

  if (success) {
    return <div data-test="component-give-up-button" />;
  }
  return (
    <button
      type="button"
      data-test="component-give-up-button"
      className="btn btn-danger mb-2"
      onClick={() => { setGivenUp(true); setSuccess(true); }}
    >
      {stringsModule.getStringByLanguage(language, 'giveUp')}
    </button>
  );
}

GiveUpButton.propTypes = {
  setGivenUp: PropTypes.func.isRequired,
};
