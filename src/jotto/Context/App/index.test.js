import React from 'react';
import { mount } from 'enzyme';
import { Provider } from 'react-redux';
import App from '.';
import { findByTestAttr, storeFactory } from '../../../testUtils';
import { getSecretWord as mockGetSecretWord } from '../../redux/actions';

jest.mock('../../redux/actions');

/**
 * Factory function to create a Wrapper for the App component.
 * @function setup
 * @param {Object} [initialState={}] - initial state for this setup.
 * @returns {Wrapper}
 */
const setup = () => {
  // const wrapper = shallow(<App />); // use mount, because useEffect not called on `shallow`
  // const wrapper = mount(<App />);
  const store = storeFactory();
  return mount(
    <Provider store={store}>
      <App />
    </Provider>,
  );
};

describe.each([
  [null, true, false],
  ['party', false, true],
])(
  'renders with secretWord as %s', (secretWord, loadingShows, appShows) => {
    let wrapper;
    let originalUseReducer;

    beforeEach(() => {
      originalUseReducer = React.useReducer;
      const mockUseReducer = jest.fn()
        .mockReturnValue([
          { secretWord, language: 'en' },
          jest.fn(),
        ]);

      React.useReducer = mockUseReducer;
      wrapper = setup();
    });

    afterEach(() => {
      React.useReducer = originalUseReducer;
    });

    test(`renders loading spinner: ${loadingShows}`, () => {
      const spinnerComponent = findByTestAttr(wrapper, 'spinner');
      expect(spinnerComponent.exists()).toBe(loadingShows);
    });

    test(`renders app: ${appShows}`, () => {
      const appComponent = findByTestAttr(wrapper, 'component-app');
      expect(appComponent.exists()).toBe(appShows);
    });
  },
);

describe('get secret word', () => {
  beforeEach(() => {
    mockGetSecretWord.mockClear();
  });
  test('getSecretWord on app mount', () => {
    const wrapper = setup();
    expect(mockGetSecretWord).toHaveBeenCalledTimes(1);
  });
  test('getSecretWord does not on app update', () => {
    const wrapper = setup();
    mockGetSecretWord.mockClear();
    // right now .update() doesn't trigger useEffect, need use .setProps();
    wrapper.setProps();
    expect(mockGetSecretWord).toHaveBeenCalledTimes(0);
  });
});
