import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';
import HttpStatus from 'http-status-codes';

import { apiURL } from '../../src/utils/helpers';
import reducer, { actions, initialState } from '../../src/redux-modules/register';
import { registerUser } from '../../src/redux-modules/register.js';

const middlewares = [ thunk ];
const mockStore = configureMockStore(middlewares);
const store = mockStore(initialState);

const axiosMock = new MockAdapter(axios);

describe('redux-module: register', () => {
  describe('reducer', () => {
    it('returns the initial state if no action is passed through', () => {
      expect(reducer()).toEqual(initialState);
    });

    it('handles USER_REGISTER_REQUEST', () => {
      const action = { type: actions.USER_REGISTER_REQUEST };
      const correctState = { ...initialState, registering: true };

      expect(reducer(undefined, action)).toEqual(correctState);
    });

    it('handles USER_REGISTER_SUCCESS', () => {
      const action = { type: actions.USER_REGISTER_SUCCESS, payload: 0};
      const correctState = { ...initialState, registered: true, createdUserId: 0 };

      expect(reducer(undefined, action)).toEqual(correctState);
    });

    it('handles USER_REGISTER_FAILURE', () => {
      const action = { type: actions.USER_REGISTER_FAILURE, payload: 'error' };
      const correctState = { ...initialState, error: 'error' };

      expect(reducer(undefined, action)).toEqual(correctState);
    });

    it('handles REMOVE_ERROR', () => {
      const action = { type: actions.REMOVE_ERROR };
      const correctState = { ...initialState };

      expect(reducer(undefined, action)).toEqual(correctState);
    });
  });

  describe('action creators', () => {
    describe('registerUser()', () => {
      beforeEach(() => {
      });

      afterEach(() => {
        store.clearActions();
        axiosMock.reset();
      });

      it('creates USER_REGISTER_REQUEST', () => {
        const expectedAction = { type: actions.USER_REGISTER_REQUEST };

        return store.dispatch(registerUser('username', 'password')).then(() => {
          expect(store.getActions()[0]).toEqual(expectedAction);
        });
      });

      it('creates USER_REGISTER_SUCCESS if registration was successful', () => {
        axiosMock.onPost(`${apiURL}/register/`).reply(HttpStatus.CREATED, { id: 0 });
        const expectedAction = { type: actions.USER_REGISTER_SUCCESS, payload: 0 };

        return store.dispatch(registerUser('username', 'password')).then(() => {
          expect(store.getActions()[1]).toEqual(expectedAction);
        });
      });

      it('creates USER_REGISTER_FAILURE if registration was unsuccessful', () => {
        axiosMock.onPost(`${apiURL}/register/`).reply(HttpStatus.BAD_REQUEST);
        const expectedAction = { type: actions.USER_REGISTER_FAILURE, payload: HttpStatus.BAD_REQUEST };

        return store.dispatch(registerUser('username', 'password')).then(() => {
          expect(store.getActions()[1]).toEqual(expectedAction);
        });
      });

      it('creates USERNAME_TAKEN if cause for failure was that the username was already taken', () => {

      });
    });
  });
});
