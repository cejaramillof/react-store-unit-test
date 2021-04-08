import React from 'react';

import stringsModule from '../../helpers/strings';
import LanguageContext from '../LanguageContext';

/**
 * Functional react component for revealed secret word
 *    (for use after the player has given up)
 * @function
 * @returns {JSX.Element} - Rendered component with secret word
 */
export default function ServerError() {
  const language = React.useContext(LanguageContext);

  return (
    <div data-test="component-server-error" className="alert alert-danger">
      {stringsModule.getStringByLanguage(language, 'serverError')}
    </div>
  );
}
