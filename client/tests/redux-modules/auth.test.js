import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';
import HttpStatus from 'http-status-codes';

import { apiURL } from '../../src/utils/helpers';
import reducer, { actions, getInitialState } from '../../src/redux-modules/auth';
import { login, logout, resetState } from '../../src/redux-modules/auth';

const token = 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJPbmxpbmUgSldUIEJ1aWxkZXIiLCJpYXQiOjE1MjM1NTk0NjMsImV4cCI6OTk5OTk5OTk5OTksImF1ZCI6Ind3dy5leGFtcGxlLmNvbSIsInN1YiI6Impyb2NrZXRAZXhhbXBsZS5jb20iLCJHaXZlbk5hbWUiOiJKb2hubnkiLCJTdXJuYW1lIjoiUm9ja2V0IiwiRW1haWwiOiJqcm9ja2V0QGV4YW1wbGUuY29tIiwiUm9sZSI6WyJNYW5hZ2VyIiwiUHJvamVjdCBBZG1pbmlzdHJhdG9yIl19.7hSvPvYkkcBbU69xcuvlUPn7kt1B3dvhz38nL34AykQ';

const middlewares = [ thunk ];
const mockStore = configureMockStore(middlewares);
const store = mockStore({ ...getInitialState() });
const axiosMock = new MockAdapter(axios);

describe('redux-module: auth', () => {
  describe('reducer', () => {
    beforeEach(() => {
      localStorage.clear();
    });

    it('returns initial state with loggedIn: false if no token exists in localStorage', () => {
      expect(reducer()).toEqual({ ...getInitialState(), loggedIn: false, jwtToken: '' }); 
    });

    it('returns initial state with loggedIn: true and jwtToken: token if token in localStorage', () => {
      localStorage.setItem('token', token);

      expect(reducer()).toEqual({ ...getInitialState(), loggedIn: true, jwtToken: token });
    });

    it('handles USER_LOGIN_REQUEST', () => {
      const action = { type: actions.USER_LOGIN_REQUEST };
      const correctState = { ...getInitialState(), loggingIn: true };

      expect(reducer(undefined, action)).toEqual(correctState);
    });

    it('handles USER_LOGIN_SUCCESS', () => {
      const action = { type: actions.USER_LOGIN_SUCCESS, payload: 'jwtToken' };
      const correctState = { ...getInitialState(), loggingIn: false, loggedIn: true, jwtToken: 'jwtToken' }

      expect(reducer(undefined, action)).toEqual(correctState);
    });

    it('handles USER_LOGIN_FAILURE', () => {
      const action = { type: actions.USER_LOGIN_FAILURE, payload: 400 };
      const correctState = { ...getInitialState(), loggingIn: false, error: 400 };

      expect(reducer(undefined, action)).toEqual(correctState);
    });

    it('handles USER_LOGOUT', () => {
      const action = { type: actions.USER_LOGOUT };
      const correctState = { ...getInitialState() };

      expect(reducer(undefined, action)).toEqual(correctState);
    });

    it('handles RESET_STATE', () => {
      const action = { type: actions.RESET_STATE };
      const correctState = { ...getInitialState() };

      expect(reducer(undefined, action)).toEqual(correctState);
    });
  });

  describe('action creators', () => {
    beforeEach(() => {
      axiosMock.onPost(`${apiURL}/obtain-token/`).reply(HttpStatus.OK, { token: 'token' });
    });

    afterEach(() => {
      store.clearActions();
      localStorage.clear();
      axiosMock.reset();
    });


    describe('login()', () => {
      it('creates USER_LOGIN_REQUEST', () => {
        const expectedAction = { type: actions.USER_LOGIN_REQUEST };

        return store.dispatch(login('username', 'password')).then(() => {
          expect(store.getActions()[0]).toEqual(expectedAction);
        });
      });

      it('creates USER_LOGIN_SUCCESS if login is successful', () => {
        const expectedAction = { type: actions.USER_LOGIN_SUCCESS, payload: 'token' };

        return store.dispatch(login('username', 'password')).then(() => {
          expect(store.getActions()[1]).toEqual(expectedAction);
        });
      });

      it('creates USER_LOGIN_FAILURE if login is unsuccessful', () => {
        axiosMock.onPost(`${apiURL}/obtain-token/`).reply(HttpStatus.BAD_REQUEST);
        const expectedAction = { type: actions.USER_LOGIN_FAILURE, payload: HttpStatus.BAD_REQUEST };

        return store.dispatch(login('username', 'password')).then(() => {
          expect(store.getActions()[1]).toEqual(expectedAction);
        });
      });

      it('adds token to localStorage if login is successful', () => {
        return store.dispatch(login('username', 'password')).then(() => {
          expect(localStorage.getItem('token')).toEqual('token');
        }); 
      });
    });

    describe('logout()', () => {
      it('creates USER_LOGOUT', () => {
        const expectedAction = { type: actions.USER_LOGOUT };

        store.dispatch(logout());
        const createdAction = store.getActions()[0];
        expect(createdAction).toEqual(expectedAction);
      });

      it('removes token from localStorage', () => {
        localStorage.setItem('token', 'token');
        expect(localStorage.getItem('token')).toEqual('token');

        store.dispatch(logout());
        expect(localStorage.getItem('token')).toBeFalsy();
      });
    });

    describe('resetState()', () => {
      it('creates RESET_STATE', () => {
        const expectedAction = { type: actions.RESET_STATE };

        store.dispatch(resetState());
        const createdAction = store.getActions()[0];

        expect(createdAction).toEqual(expectedAction);
      });
    });
  });
});
