import moxios from 'moxios';
import { correctGuess, actionTypes, getSecretWord } from '.';
import { storeFactory } from '../../../testUtils';

describe('correctGuess', () => {
  test('returns an action with type `CORRECT_GUESS`', () => {
    const action = correctGuess();
    // expect(action).toBe({}); // for the immutability
    expect(action).toEqual({ type: actionTypes.CORRECT_GUESS });
    expect(action).toStrictEqual({ type: actionTypes.CORRECT_GUESS });
  });
});

describe('getSecretWord action creator', () => {
  beforeEach(() => {
    moxios.install(); // receive instance of axios as a param
  });
  afterEach(() => {
    moxios.uninstall();
  });
  test('add response word to state', () => {
    const secretWord = 'party';
    const store = storeFactory();
    moxios.wait(() => {
      const request = moxios.requests.mostRecent();
      request.respondWith({
        status: 200,
        // response: secretWord,
        response: { word: secretWord },
      });
    });
    return store.dispatch(getSecretWord())
      .then(() => {
        const newState = store.getState();
        expect(newState.secretWord).toBe(secretWord);
      });
  });

  describe('updates serverError state to `true`', () => {
    test('when server returns 4xx status', () => {
      const store = storeFactory();
      moxios.wait(() => {
        const request = moxios.requests.mostRecent();
        request.respondWith({
          status: 404,
        });
      });
      return store.dispatch(getSecretWord())
        .then(() => {
          const newState = store.getState();
          expect(newState.serverError).toBe(true);
        });
    });
    test('when server returns 5xx status', () => {
      const store = storeFactory();
      moxios.wait(() => {
        const request = moxios.requests.mostRecent();
        request.respondWith({
          status: 500,
        });
      });
      return store.dispatch(getSecretWord())
        .then(() => {
          const newState = store.getState();
          expect(newState.serverError).toBe(true);
        });
    });
  });
});
