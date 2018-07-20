import React from 'react';
import renderer from 'react-test-renderer';
import { createShallow } from '@material-ui/core/test-utils';

import { LoginForm } from '../../../src/components/LoginForm';

describe('component: LoginForm', () => {
  const login = jest.fn();
  const resetState = jest.fn();
  const handleChangeComponent = jest.fn();
  const classes = { button: '' };
  let wrapper;

  beforeEach(() => {
    const shallow = createShallow();
    wrapper = shallow(
      <LoginForm
        login={login}
        resetState={resetState}
        handleChangeComponent={handleChangeComponent}
        classes={classes}
      />
    );
  });

  describe('rendering', () => {
    it('matches snapshot', () => {
      const tree = renderer.create(
        <LoginForm
          login={login}
          resetState={resetState}
          classes={classes}
          handleChangeComponent={handleChangeComponent}
        />
      ).toJSON(); 

      expect(tree).toMatchSnapshot();
    });
  });

  describe('functionality', () => {
    it('takes username input', () => {
      const usernameInput = wrapper.find('#username').dive().dive().find('#username');
      usernameInput.simulate('change', { target: { id: 'username', value: 'Username' } });

      expect(wrapper.state('username')).toEqual('Username');
    });

    it('takes password input', () => {
      const passwordInput = wrapper.find('#password').dive().dive().find('#password');
      passwordInput.simulate('change', { target: { id: 'password', value: 'Password' } });

      expect(wrapper.state('password')).toEqual('Password');
    });
  });
});
