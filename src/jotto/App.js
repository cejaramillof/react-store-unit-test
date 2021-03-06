import React, { Component } from 'react';

import GuessedWords from './GuessedWords';
import Congrats from './Congrats';

class App extends Component {
  render() {
    return (
      <>
        <h1>Jotto</h1>
        <Congrats success={true} />
        <GuessedWords
          guessedWords={[
            { guessedWord: 'train', letterMatchCount: 3 },
          ]}
        />
      </>
    );
  }
}

export default App;
