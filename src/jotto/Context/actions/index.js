import axios from 'axios';

export const WORDNIK_KEY = '48dd829661f515d5abc0d03197a00582e888cc7da2484d5c7';
export const WORDNIK_URL = `https://api.wordnik.com/v4/words.json/randomWord?hasDictionaryDef=true&minCorpusCount=1000&minDictionaryCount=100&maxDictionaryCount=-1&minLength=5&maxLength=5&api_key=${WORDNIK_KEY}`;

/**
 * Dispatch axios action to get secret word from random word server.
 * Separate this out so it can be used in getSecretWord and resetGame.
 * @function getSecretWordDispatch
 * @param {dispatch} dispatch - Redux Thunk dispatch.
 *
 */
const getSecretWordDispatch = async (setSecretWord, setServerError) => {
  try {
    const response = await axios.get('http://localhost:3030');
    setSecretWord(response.data);
  } catch {
    setServerError(true);
  }
};

/**
 * Dispatch axios action to get secret word from Wordnik.
 * Separate this out so it can be used in getSecretWord and resetGame.
 * @function getSecretWordWordnikDispatch
 * @param {dispatch} dispatch - Redux Thunk dispatch.
 *
 */
const getSecretWordWordnikDispatch = async (setSecretWord, setServerError) => {
  try {
    const response = await axios.get(WORDNIK_URL, {
      method: 'HEAD',
      mode: 'no-cors',
    });
    setSecretWord(response.data.word);
  } catch {
    setServerError(true);
  }

};

/**
 * Returns Redux Thunk function that dispatches GET_SECRET_WORD action
 *     after axios promise resolves
 * @function getSecretWord
 * @returns {function} - Redux Thunk function.
*/
export const getSecretWord = (setSecretWord, setServerError) => {
  return getSecretWordWordnikDispatch(setSecretWord, setServerError);
};

export default {
  getSecretWord,
};
