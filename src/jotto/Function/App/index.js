import React, { useEffect } from 'react';
import GuessedWords from '../../Class/GuessedWords';
import Congrats from '../../Class/Congrats';
import Input from '../Input';
import { getSecretWord } from '../../redux/actions';

function App() {
  // TODO: get props from shared state
  const success = false;
  const secretWord = 'party';
  const guessedWords = [];

  useEffect(() => {
    getSecretWord();
  }, []);

  return (
    <div data-test="component-app" className="container">
      <h1>Jotto</h1>
      <Congrats success={success} />
      <Input success={success} secretWord={secretWord} />
      <GuessedWords
        guessedWords={guessedWords}
      />
    </div>
  );
}

export default App;