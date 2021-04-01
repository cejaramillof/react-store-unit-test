import React, { useEffect } from 'react';
import GuessedWords from '../../Class/GuessedWords';
import Congrats from '../../Class/Congrats';
import Input from '../../Class/Input';
import { getSecretWord } from '../../redux/actions';

/**
 *
 * @function reducer to update state, automatically called by dispatch
 * @param {object} state - previous state
 * @param {object} action - `type` and `payload` properties
 * @returns {object} - new state
 */
const reducer = (state, action) => {
  switch (action.type) {
    case 'setSecretWord':
      return {
        ...state,
        secretWord: action.payload,
      };
    default:
      throw new Error(`invalid action type: ${action.type}`);
  }
};

function App() {
  // TODO: get props from shared state
  // const [secretWord, setSecretWord] = useState('');
  const [state, dispatch] = React.useReducer(reducer, { secretWord: '' });
  const success = false;
  const guessedWords = [];

  const setSecretWord = (secretWord) => {
    dispatch({ type: 'setSecretWord', payload: secretWord });
  };

  useEffect(() => {
    getSecretWord(setSecretWord);
  }, []);

  if (state.secretWord === null) {
    return (
      <div
        className="container"
        data-test="spinner"
      >
        <div className="spinner-border" role="status">
          <span className="sr-only">
            Loading...
          </span>
          <p>Loading secret word...</p>
        </div>
      </div>
    );
  }

  return (
    <div data-test="component-app" className="container">
      <h1>Jotto</h1>

      <Congrats success={success} />
      <Input />
      <GuessedWords
        guessedWords={guessedWords}
      />

    </div>
  );
}

export default App;
