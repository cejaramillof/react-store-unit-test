import PropTypes from 'prop-types';
import React from 'react';

function Input({ secretWord }) {
  return (
    <div data-test="component-input" />
  );
}

Input.propTypes = {
  secretWord: PropTypes.string.isRequired,
};

export default Input;
