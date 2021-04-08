import moxios from 'moxios';
import { getSecretWord } from '.';

describe('moxios tests', () => {
  beforeEach(() => {
    moxios.install();
  });
  afterEach(() => {
    moxios.uninstall();
  });

  describe('non-error response', () => {
    const mockSetSecretWord = jest.fn();
    const mockSetServerError = jest.fn();
    const secretWord = { word: 'party' };

    beforeEach(async () => {
      moxios.wait(() => {
        const request = moxios.requests.mostRecent();
        request.respondWith({
          status: 200,
          response: secretWord,
        });
      });

      await getSecretWord(mockSetSecretWord, mockSetServerError);

    });
    test('calls the getSecretWord callback on axios response', async () => {
      expect(mockSetSecretWord).toHaveBeenCalledWith(secretWord.word);
    });
    test('does not call the setServerError callback on axios response', async () => {
      expect(mockSetServerError).not.toHaveBeenCalled();
    });
  });

  describe('5xx error response', () => {
    const mockSetSecretWord = jest.fn();
    const mockSetServerError = jest.fn();

    beforeEach(async () => {
      moxios.wait(() => {
        const request = moxios.requests.mostRecent();
        request.respondWith({
          status: 500,
        });
      });

      await getSecretWord(mockSetSecretWord, mockSetServerError);

    });
    test('calls the getSecretWord callback on axios response', async () => {
      expect(mockSetServerError).toHaveBeenCalledWith(true);
    });
    test('does not call the setServerError callback on axios response', async () => {
      expect(mockSetSecretWord).not.toHaveBeenCalled();
    });
  });
  describe('4xx error response', () => {
    const mockSetSecretWord = jest.fn();
    const mockSetServerError = jest.fn();

    beforeEach(async () => {
      moxios.wait(() => {
        const request = moxios.requests.mostRecent();
        request.respondWith({
          status: 404,
        });
      });

      await getSecretWord(mockSetSecretWord, mockSetServerError);

    });
    test('calls the getSecretWord callback on axios response', async () => {
      expect(mockSetServerError).toHaveBeenCalledWith(true);
    });
    test('does not call the setServerError callback on axios response', async () => {
      expect(mockSetSecretWord).not.toHaveBeenCalled();
    });
  });
});
