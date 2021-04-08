import React from 'react';
import Congrats from '../Congrats';
import Input from '../Input';
import hookActions from '../actions';
import GuessedWords from '../GuessedWords';
import LanguageContext from '../LanguageContext';
import LanguagePicker from '../LanguagePicker';
import SuccessContext from '../SuccessContext';
import GuessedWordsContext from '../GuessedWordsContext';
import NewWordButton from '../NewWordButton';
import SecretWordReveal from '../SecretWordReveal';
import GiveUpButton from '../GiveUpButton';
import EnterSecretWordButton from '../EnterSecretWordButton';
import SecretWordEntry from '../SecretWordEntry';

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
    case 'setGivenUp':
      return {
        ...state,
        givenUp: action.payload };
    case 'setEnterSecretWord':
      return {
        ...state,
        enterSecretWord: action.payload };
    case 'setServerError':
      return {
        ...state,
        serverError: action.payload };
    default:
      throw new Error(`invalid action type: ${action.type}`);
  }
};

function App() {
  const [state, dispatch] = React.useReducer(
    reducer,
    { secretWord: '', language: 'en' },
  );

  const setSecretWord = (secretWord) => {
    dispatch({ type: 'setSecretWord', payload: secretWord });
  };

  const setLanguage = (language) => {
    dispatch({ type: 'setLanguage', payload: language });
  };

  const setGivenUp = givenUp => dispatch({ type: 'setGivenUp', payload: givenUp });

  const setEnterSecretWord = enterSecretWord => dispatch({ type: 'setEnterSecretWord', payload: enterSecretWord });

  const setServerError = isServerError => dispatch({ type: 'setEnterSecretWord', payload: isServerError });

  React.useEffect(
    () => { hookActions.getSecretWord(setSecretWord, setServerError); },
    [],
  );

  if (!state.secretWord) {
    return (
      <div className="container" data-test="spinner">
        <div className="spinner-border" role="status">
          <span className="sr-only">Loading...</span>
        </div>
        <p>Loading secret word</p>
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
        <GuessedWordsContext.GuessedWordsProvider>
          { state.enterSecretWord ?
            <SecretWordEntry setEnterSecretWord={setEnterSecretWord} setSecretWord={setSecretWord} /> :
            (
              <div>
                <SuccessContext.SuccessProvider>
                  { state.givenUp ?
                    <SecretWordReveal secretWord={state.secretWord} /> :
                    <Congrats /> }
                  <NewWordButton setSecretWord={setSecretWord} setGivenUp={setGivenUp} />
                  { !state.givenUp ? <GiveUpButton setGivenUp={setGivenUp} /> : '' }
                  <Input secretWord={state.secretWord} />
                </SuccessContext.SuccessProvider>
                <GuessedWords />
                <EnterSecretWordButton setEnterSecretWord={setEnterSecretWord} />
              </div>
            )
          }
        </GuessedWordsContext.GuessedWordsProvider>
      </LanguageContext.Provider>
    </div>
  );
}

export default App;
