import PropTypes from 'prop-types';
import React from 'react';

function Input({ secretWord }) {
  const [currentGuess, setCurrentGuess] = React.useState('');

  return (
    <div data-test="component-input">
      <form action="" className="form-inline">
        <input
          type="text"
          data-test="input-box"
          className="mb-2 mx-sm-3"
          placeholder="enter guess"
          value={currentGuess}
          onChange={evt => setCurrentGuess(evt.target.value)}
        />
        <button
          type="submit"
          data-test="submit-button"
          className="btn btn-primary mb-2"
        >
          Submit
        </button>
      </form>
    </div>
  );
}

Input.propTypes = {
  secretWord: PropTypes.string.isRequired,
};

export default Input;
