import React from 'react';
import LanguageContext from '../LanguageContext';
import stringsModule from '../../helpers/strings';
import SuccessContext from '../SuccessContext';

/**
 * Functional react component for congratulatory message.
 * @function
 * @returns {JSX.Element} - Rendered component (or null if `success` prop is false).
 */
const Congrats = () => {
  const [success] = SuccessContext.useSuccess();
  const language = React.useContext(LanguageContext);
  if (success) {
    return (
      <div data-test="component-congrats" className="alert alert-success">
        <span data-test="congrats-message">
          {stringsModule.getStringByLanguage(language, 'congrats')}
        </span>
      </div>
    );
  }
  return (
    <div data-test="component-congrats" />
  );

};

export default Congrats;
