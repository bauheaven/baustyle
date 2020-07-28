import * as React from 'react';
import { configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import 'jsdom-global/register';
import { Input } from './';
import { mount as _mount } from 'enzyme';

import { ThemeProvider } from 'styled-components';
import theme from '../../stories/themes';

configure({ adapter: new Adapter() });

const withTheme = compoment => (
  <ThemeProvider theme={theme}>{compoment}</ThemeProvider>
);
const mount = component => _mount(withTheme(component));

describe('Input Error handling', () => {
  test('trigger error', () => {
    const ErrorDummy = () => null;
    const wrapper = mount(
      <Input label="test">
        <Input.Error check={/\w+/}>
          <ErrorDummy />
        </Input.Error>
      </Input>
    );

    expect(wrapper.find(ErrorDummy).length).toBe(0);

    wrapper.find('input').simulate('blur');

    expect(wrapper.find(ErrorDummy).length).toBe(1);
  });

  test('avoid trigger error', () => {
    const ErrorDummy = () => null;
    const wrapper = mount(
      <Input label="test">
        <Input.Error check={/\w+/}>
          <ErrorDummy />
        </Input.Error>
      </Input>
    );

    expect(wrapper.find(ErrorDummy).length).toBe(0);

    wrapper.find('input').simulate('blur', { target: { value: 'foo' } });

    expect(wrapper.find(ErrorDummy).length).toBe(0);
  });

  test('input is optional', () => {
    const ErrorDummy = () => null;
    const wrapper = mount(<Input label="test"></Input>);

    expect(wrapper.find(ErrorDummy).length).toBe(0);

    wrapper.find('input').simulate('focus');

    wrapper.find('input').simulate('blur');

    expect(wrapper.find(ErrorDummy).length).toBe(0);
  });
});
