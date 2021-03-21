import { combineReducers } from 'redux';
import success from './sucessReducer';
import guessedWords from './guessedWordsReducer';
import secretWord from './secretWordReducer';

export default combineReducers({
  success,
  guessedWords,
  secretWord,
});
