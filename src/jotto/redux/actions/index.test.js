import { correctGuess, actionTypes } from '.';

describe('correctGuess', () => {
  test('returns an action with type `CORRECT_GUESS`', () => {
    const action = correctGuess();
    // expect(action).toBe({}); // for the immutability
    expect(action).toEqual({ type: actionTypes.CORRECT_GUESS });
  });
});
