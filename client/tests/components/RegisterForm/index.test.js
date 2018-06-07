import React from 'react';
import renderer from 'react-test-renderer';
import { createShallow } from '@material-ui/core/test-utils';

import { RegisterForm } from '../../../src/components/RegisterForm';

describe('component: RegisterForm', () => {
  const register = jest.fn();
  const removeError = jest.fn();
  const classes = { button: '' };
  let wrapper;

  beforeEach(() => {
    const shallow = createShallow();
    wrapper = shallow(
      <RegisterForm
        register={register}
        removeError={removeError}
        classes={classes}
      />
    );
  });
  describe('rendering', () => {
    it('matches snapshot', () => {
      const tree = renderer.create(
        <RegisterForm register={register} removeError={removeError} classes={classes} />
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

    it('takes confirm password input', () => {
      const confirmPasswordInput = wrapper.find('#confirmPassword').dive().dive().find('#confirmPassword');
      confirmPasswordInput.simulate('change', { target: { id: 'confirmPassword', value: 'ConfirmPassword' } });

      expect(wrapper.state('confirmPassword')).toEqual('ConfirmPassword');
    });
  });
});
