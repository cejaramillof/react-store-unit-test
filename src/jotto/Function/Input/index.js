import React from 'react';
// import React, { useState } from 'react';
// import PropTypes from 'prop-types';
import { useDispatch, useSelector } from 'react-redux';
import { guessWord } from '../../redux/actions';

function Input() {
  // const [currentGuess, setCurrentGuess] = useState('');
  const [currentGuess, setCurrentGuess] = React.useState('');
  const success = useSelector(state => state.success);
  const dispatch = useDispatch();

  const contents = success ? null : (
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
        onClick={(evt) => {
          evt.preventDefault();
          if (currentGuess && currentGuess.length > 0) {
            dispatch(guessWord(currentGuess));
          }
          setCurrentGuess('');
        }}
      >
        Submit
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
