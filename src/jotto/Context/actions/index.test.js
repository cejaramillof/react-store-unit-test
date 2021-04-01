import moxios from 'moxios';
import { getSecretWord } from '.';
import { storeFactory } from '../../../testUtils';

describe('getSecretWord action creator', () => {
  beforeEach(() => {
    moxios.install(); // receive instance of axios as a param
  });
  afterEach(() => {
    moxios.uninstall();
  });
  test('add response word to state', async () => {
    const secretWord = 'party';
    moxios.wait(() => {
      const request = moxios.requests.mostRecent();
      request.respondWith({
        status: 200,
        // response: secretWord,
        response: { word: secretWord },
      });
    });
    const mockSetSecretWord = jest.fn();
    await getSecretWord(mockSetSecretWord);
    expect(mockSetSecretWord).toHaveBeenCalledWith('party');
  });

  describe.skip('updates serverError state to `true`', () => {
    test('when server returns 4xx status', () => {
      const store = storeFactory();
      moxios.wait(() => {
        const request = moxios.requests.mostRecent();
        request.respondWith({
          status: 404,
        });
      });
      return getSecretWord()
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
      return getSecretWord()
        .then(() => {
          const newState = store.getState();
          expect(newState.serverError).toBe(true);
        });
    });
  });
});
