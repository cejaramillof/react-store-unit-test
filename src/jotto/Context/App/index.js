import React, { useEffect } from 'react';
import Congrats from '../Congrats';
import Input from '../Input';
import { getSecretWord } from '../../redux/actions';
import GuessedWords from '../GuessedWords';
import LanguageContext from '../LanguageContext';
import LanguagePicker from '../LanguagePicker';
import SuccessContext from '../SuccessContext';

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
    case 'setLanguage':
      return {
        ...state,
        language: action.payload,
      };
    default:
      throw new Error(`invalid action type: ${action.type}`);
  }
};

function App() {
  // TODO: get props from shared state
  // const [secretWord, setSecretWord] = useState('');
  const [state, dispatch] = React.useReducer(reducer, { secretWord: '', language: 'en' });
  const success = false;
  const guessedWords = [];

  const setSecretWord = (secretWord) => {
    dispatch({ type: 'setSecretWord', payload: secretWord });
  };

  const setLanguage = (language) => {
    dispatch({ type: 'setLanguage', payload: language });
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
  // with useContext with avoid the prop drilling
  // https://kentcdodds.com/blog/application-state-management-with-react
  return (
    <div data-test="component-app" className="container">
      <h1>Jotto</h1>
      <LanguageContext.Provider value={state.language}>
        <LanguagePicker setLanguage={setLanguage} />
        <SuccessContext.SuccessProvider>
          <Congrats />
          <Input />
        </SuccessContext.SuccessProvider>
        <GuessedWords
          guessedWords={guessedWords}
        />
      </LanguageContext.Provider>
    </div>
  );
}

export default App;
