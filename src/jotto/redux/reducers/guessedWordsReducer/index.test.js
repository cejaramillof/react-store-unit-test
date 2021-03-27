import { actionTypes } from '../../actions';
import guessedWordsReducer from '.';

test('returns state of `[]` upon receiving an action of type `RESET_GAME`', () => {
  const initialState = [{ guessedWord: 'train', letterMatchCount: 3 }];
  const newState = guessedWordsReducer(initialState, { type: actionTypes.RESET_GAME });
  expect(newState).toEqual([]);
});
