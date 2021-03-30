import { actionTypes } from '../../actions';
import successReducer from '.';

test('returns default initial state of `false`when no action is passed', () => {
  const newState = successReducer(undefined, {});
  expect(newState).toBe(false);
});

test('returns previous state when unknown action type', () => {
  const newState = successReducer(false, { type: 'unknown' });
  expect(newState).toBe(false);
});

test('returns state of true upon receiving an action of type `CORRECT_GUESS`', () => {
  const newState = successReducer(false, { type: actionTypes.CORRECT_GUESS });
  expect(newState).toBe(true);
});
