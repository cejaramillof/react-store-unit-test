import { combineReducers } from 'redux';
import success from './sucessReducer';
import guessedWords from './guessedWordsReducer';

export default combineReducers({
  success,
  guessedWords,
});
