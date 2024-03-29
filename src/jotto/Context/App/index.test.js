import React from 'react';
import { mount } from 'enzyme';
import App from '.';
import { findByTestAttr } from '../../../testUtils';
import hookActions from '../actions';

const mockGetSecretWord = jest.fn();

/**
 * Factory function to create a Wrapper for the App component.
 * @function setup
 * @param {string} secretWord - desired secretWord state value for test
 * @returns {ReactWrapper}
 */
const setup = (secretWord = 'party') => {
  mockGetSecretWord.mockClear();
  hookActions.getSecretWord = mockGetSecretWord;

  const mockUseReducer = jest.fn()
    .mockReturnValue([
      { secretWord, language: 'en' },
      jest.fn(),
    ]);

  React.useReducer = mockUseReducer;

  // use mount, because useEffect not called on `shallow`
  // https://github.com/airbnb/enzyme/issues/2086
  return mount(<App />);
};

test('App renders without error', () => {
  const wrapper = setup();
  const component = findByTestAttr(wrapper, 'component-app');
  expect(component.length).toBe(1);
});

describe.each([
  [null, false, true],
  ['party', false, true],
])(
  'renders with secretWord as %s', (secretWord, loadingShows, appShows) => {
    let wrapper;
    let originalUseReducer;

    beforeEach(() => {
      originalUseReducer = React.useReducer;
      const mockUseReducer = jest.fn()
        .mockReturnValue([
          { secretWord },
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

describe('getSecretWord calls', () => {
  test('getSecretWord gets called on App mount', () => {
    setup();

    // check to see if secret word was updated
    expect(mockGetSecretWord).toHaveBeenCalled();
  });
  test('secretWord does not update on App update', () => {
    const wrapper = setup();
    mockGetSecretWord.mockClear();

    // wrapper.update() doesn't trigger update
    // (issue forked from https://github.com/airbnb/enzyme/issues/2091)
    wrapper.setProps();

    expect(mockGetSecretWord).not.toHaveBeenCalled();
  });
});

describe('secretWord is not null', () => {
  let wrapper;
  beforeEach(() => {
    wrapper = setup('party');
  });

  test('renders app when secretWord is not null', () => {
    const appComponent = findByTestAttr(wrapper, 'component-app');
    expect(appComponent.exists()).toBe(true);
  });
  test('does not render spinner when secretWord is not null', () => {
    const spinnerComponent = findByTestAttr(wrapper, 'spinner');
    expect(spinnerComponent.exists()).toBe(false);
  });

});

describe('secretWord is null', () => {
  let wrapper;
  beforeEach(() => {
    wrapper = setup(null);
  });

  test('does not render app when secretWord is null', () => {
    const appComponent = findByTestAttr(wrapper, 'component-app');
    expect(appComponent.exists()).toBe(false);
  });
  test('renders spinner when secretWord is null', () => {
    const spinnerComponent = findByTestAttr(wrapper, 'spinner');
    expect(spinnerComponent.exists()).toBe(true);
  });
});
