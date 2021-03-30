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

describe('App', () => {
  let wrapper;

  beforeEach(() => {
    wrapper = setup();
  });

  test('renders without error', () => {
    const appComponent = findByTestAttr(wrapper, 'component-app');
    expect(appComponent).toHaveLength(1);
  });
});

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
