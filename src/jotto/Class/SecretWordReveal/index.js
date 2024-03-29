import React from 'react';
import PropTypes from 'prop-types';

/**
 * Functional react component for "you gave up" message.
 * @function
 * @param {object} props - React props.
 * @returns {JSX.Element} - Rendered component (or null if `display` prop is false).
 */
const SecretWordReveal = (props) => {
  if (props.display) {
    return (
      <div data-test="component-secret-word-reveal" className="alert alert-danger">
        <span data-test="reveal-message">
          The secret word was `&quot;`
          {props.secretWord}
          `&quot;`
          <br />
          Better luck next time!
        </span>
      </div>
    );
  }
  return (
    <div data-test="component-secret-word-reveal" />
  );

};

SecretWordReveal.propTypes = {
  display: PropTypes.bool.isRequired,
  secretWord: PropTypes.string,
};

export default SecretWordReveal;
