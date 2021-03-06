import { combineReducers } from 'redux';
import success from './sucessReducer';

export default combineReducers({
  success,
  guessedWords,
});
