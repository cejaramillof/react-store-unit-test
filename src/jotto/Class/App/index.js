import React, { Component } from 'react';
import { connect } from 'react-redux';

import TotalGuesses from '../TotalGuesses';
import NewWordButton from '../NewWordButton';
import SecretWordReveal from '../SecretWordReveal';
import EnterWordButton from '../EnterWordButton';
import EnterWordForm from '../EnterWordForm';
import ServerError from '../ServerError';

import GuessedWords from '../GuessedWords';
import Congrats from '../Congrats';
import Input from '../Input';

// Challenge #2 and #4
import {
  getSecretWord,
  resetGame,
  setUserSecretWord,
  setUserEntering }
  from '../../redux/actions';

export class UnconnectedApp extends Component {

  /**
   *
   * @memberof App
   * @method componentDidMount
   * @returns {undefined}
   */
  componentDidMount() {
    this.props.getSecretWord();
  }

  render() {
    let contents;
    if (this.props.serverError) {
      contents = <ServerError />;
    } else if (this.props.userEnter === 'inProgress') {
      contents = (
        <EnterWordForm formAction={this.props.setUserSecretWord} />
      );
    } else {
      contents = (
        <div>
          <Congrats success={this.props.success} />
          <SecretWordReveal display={this.props.gaveUp} secretWord={this.props.secretWord} />
          <NewWordButton
            display={this.props.success || this.props.gaveUp}
            resetAction={this.props.resetGame}
          />
          <Input />
          <GuessedWords guessedWords={this.props.guessedWords} />
          <TotalGuesses guessCount={this.props.guessedWords.length} />
          <EnterWordButton
            display={this.props.guessedWords.length === 0}
            buttonAction={this.props.setUserEntering}
          />
        </div>
      );
    }
    return (
      <div className="container">
        <h1>Jotto</h1>
        { contents }
      </div>
    );
  }
}

const mapStateToProps = ({ success, guessedWords, secretWord, gaveUp, userEnter, serverError }) => {
  return { success, guessedWords, secretWord, gaveUp, userEnter, serverError };
};

const actions = {
  getSecretWord,
  resetGame,
  setUserSecretWord,
  setUserEntering,
};

export default connect(mapStateToProps, actions)(UnconnectedApp);
