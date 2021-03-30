import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import GuessedWords from '../../Class/GuessedWords';
import Congrats from '../../Class/Congrats';
import Input from '../Input';
import { getSecretWord } from '../../redux/actions';

function App() {
  // TODO: get props from shared state
  const success = useSelector(state => state.success);
  const guessedWords = useSelector(state => state.guessedWords);
  // const secretWord = useSelector(state => state.secretWord);

  useEffect(() => {
    getSecretWord();
  }, []);

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
