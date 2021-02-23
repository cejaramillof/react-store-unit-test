import React from 'react';
import PropTypes from 'prop-types';

/**
 * Functional react component for congratularoty message.
 * @function
 * @param {object} props - React props.
 * @return {JSX.Element} - Rendered component (or null if success prop is )
 */
function Congrats({ success }) {

  return (
    <div data-test="component-congrats">
      { success && (
        <span data-test="congrats-message">
          Congratulations! You guessed the word!
        </span>
      )}
    </div>
  );

}

Congrats.propTypes = {
  success: PropTypes.bool.isRequired,
};

export default Congrats;
