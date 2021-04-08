import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import GuessedWords from '../../Class/GuessedWords';
import Congrats from '../../Class/Congrats';
import NewWordButton from '../../Class/NewWordButton';
import Input from '../Input';
import { getSecretWord, resetGame } from '../../redux/actions';

function App() {
  // TODO: get props from shared state
  const success = useSelector(state => state.success);
  const guessedWords = useSelector(state => state.guessedWords);
  const secretWord = useSelector(state => state.secretWord);
  const gaveUp = useSelector(state => state.gaveUp);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getSecretWord());
  }, []);

  return (
    <div data-test="component-app" className="container">
      <h1>Jotto</h1>
      <NewWordButton display={success || gaveUp} resetAction={resetGame} />
      <Congrats success={success} secretWord={secretWord} />
      <Input />
      <GuessedWords
        guessedWords={guessedWords}
      />
    </div>
  );
}

export default App;
