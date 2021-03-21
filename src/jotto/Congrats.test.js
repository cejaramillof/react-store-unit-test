import Congrats from './Congrats';
import { findByTestAttr, setup, checkProps } from './testUtils';

test('render without error', () => {
  const wrapper = setup(Congrats, { success: false });
  const component = findByTestAttr(wrapper, 'component-congrats');
  expect(component.length).toBe(1);
});

test('render no text when `success` prop is false', () => {
  const wrapper = setup(Congrats, { success: false });
  const component = findByTestAttr(wrapper, 'component-congrats');
  expect(component.text()).toBe('');
});

test('render non-empty congrats message when `success` prop is true', () => {
  const wrapper = setup(Congrats, { success: true });
  const message = findByTestAttr(wrapper, 'congrats-message');
  expect(message.length).not.toBe(0);
  expect(message.text().length).not.toBe(0);
});

test('does not throw warning with expected props', () => {
  const expectedProps = { success: true };
  checkProps(Congrats, expectedProps);
  // const propError = checkPropTypes(Congrats.propTypes, expectedProps, 'prop', Congrats.name);
  // expect(propError).toBeUndefined();
});
