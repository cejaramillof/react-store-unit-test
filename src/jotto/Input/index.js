import React, { Component } from 'react';
import { connect } from 'react-redux';
import { guessWord, giveUp } from '../redux/actions';

export class UnconnectedInput extends Component {
  /**
   * Creates an instance of UnconnectedInput.
   * @memberof UnconnectedInput
   * @method constructor
   * @param {object} props - Component props.
   * @returns {undefined}
   */
  constructor(props) {
    super(props);
    // this.state = { currentGuess: '' };
    this.inputBox = React.createRef();
    this.submitGuessedWord = this.submitGuessedWord.bind(this);
    this.giveUpOnClick = this.giveUpOnClick.bind(this);
  }

  /**
   * Run `guessWord` action on the submitted word (if it's not empty)
   * @method submitGuessedWord
   * @param {Event} evt - Event that triggered the call.
   * @returns {undefined}
   */
  submitGuessedWord(evt) {
    evt.preventDefault();
    // const guessedWord = this.state.currentGuess;
    // if (guessedWord && guessedWord.length > 0) this.props.guessWord(guessedWord);
    // this.setState({ currentGuess: '' });

    const guessedWord = this.inputBox.current.value;
    if (guessedWord && guessedWord.length > 0) this.props.guessWord(guessedWord);
    this.inputBox.current.value = '';
  }

  giveUpOnClick(evt) {
    evt.preventDefault();
    this.props.giveUp();
  }

  render() {
    const contents = this.props.success || this.props.gaveUp ?
      null :
      (
        <form className="form-inline">
          <input
            ref={this.inputBox}
            data-test="input-box"
            className="mb-2 mx-sm-3"
            type="text"
            // value={this.state.currentGuess}
            // onChange={evt => this.setState({ currentGuess: evt.taget.value })}
            placeholder="enter guess"
          />
          <button
            data-test="submit-button"
            className="btn btn-primary mb-2"
            type="submit"
            // onClick={() => this.props.guessWord(this.state.currentGuess)}
            // onClick={evt => this.submitGuessedWord(evt)}
            onClick={this.submitGuessedWord}
          >
            Submit
          </button>
          <button
            data-test="give-up-button"
            onClick={this.giveUpOnClick}
            className="btn btn-danger mb-2"
            type="button"
          >
            Give up
          </button>
        </form>
      );
    return (
      <div data-test="component-input">
        {contents}
      </div>
    );
  }
}

const mapStateToProps = ({ success, gaveUp }) => {
  return { success, gaveUp };
};

export default connect(mapStateToProps, { guessWord, giveUp })(UnconnectedInput);
