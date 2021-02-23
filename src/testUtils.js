import React from 'react';
import { shallow } from 'enzyme';
import { checkPropTypes } from 'prop-types';

/**
 * Factory function to create a ShallowWrapper for the App component.
 * @function setup
 * @param {JSX.Element} Component - Component to render.
 * @param {object} [props] - Component props specific to this setup.
 * @param {object} [defaultProps] - Component default props to test.
 * @returns {ShallowWrapper}
 */
export const setup = (Component, props = {}, defaultProps = {}) => {
  const setupProps = { ...defaultProps, ...props };
  return shallow(<Component {...setupProps} />);
};

/**
 * Return ShallowWrapper containing node(s) with the given data-test value.
 * @param {ShallowWrapper} wrapper - Enzyme shallow wrapper to search within.
 * @param {string} val - Value of data-test to find!
 * @param {string} [customAttribute=data-test] - key of data to find!
 *
 */
export const findByTestAttr = (wrapper, val, customAttribute = 'data-test') => {
  return wrapper.find(`[${customAttribute}='${val}']`);
};

/**
* Throw error if conformingProps do not pass propTypes validation.
* @param {React.Component} component - Component to check props against.
* @param {object} conformingProps - Props we expect to conform to defined propTypes.
*/
export const checkProps = (component, conformingProps) => {
  const propError = checkPropTypes(
    component.propTypes,
    conformingProps,
    'prop',
    component.name,
  );
  expect(propError).toBeUndefined();
};
