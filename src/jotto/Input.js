import React, { Component } from 'react';
import { connect } from 'react-redux';
import { guessWord } from './redux/actions';

export class UnconnectedInput extends Component {
  /**
   * Creates an instance of UnconnectedInput.
   * @param {object} props - Component props.jj
   * @memberof UnconnectedInput
   */
  constructor(props) {
    super(props);
    this.state = { currentGuess: null };
    this.submitGuessedWord = this.submitGuessedWord.bind(this);
  }

  submitGuessedWord(evt) {
    evt.preventDefault();
    const guessedWord = this.state.currentGuess;
    if (guessedWord && guessedWord.length > 0) this.props.guessWord(guessedWord);
  }

  render() {
    const contents = this.props.success ?
      null : (
        <form className="form-inline">
          <input
            data-test="input-box"
            className="mb-2 mx-sm-3"
            type="text"
            value={this.state.currentGuess}
            onChange={evt => this.setState({ currentGuess: evt.taget.value })}
            placeholder="enter guess"
          />
          <button
            data-test="submit-button"
            className="btn btn-primary mb-2"
            type="button"
            // onClick={() => this.props.guessWord(this.state.currentGuess)}
            onClick={evt => this.submitGuessedWord(evt)}
            submit
          >
            Submit
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

const mapStateToProps = ({ success }) => {
  return { success };
};

export default connect(mapStateToProps, { guessWord })(UnconnectedInput);
