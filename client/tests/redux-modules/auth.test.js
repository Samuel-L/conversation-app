import reducer, { actions, getInitialState } from '../../src/redux-modules/auth';

describe('redux-module: auth', () => {
  describe('reducer', () => {
    beforeEach(() => {
      localStorage.clear();
    });

    it('returns initial state with loggedIn: false if no token exists in localStorage', () => {
      expect(reducer()).toEqual({ ...getInitialState(), loggedIn: false, jwtToken: '' }); 
    });

    it('returns initial state with loggedIn: true and jwtToken: token if token in localStorage', () => {
      const token = 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJPbmxpbmUgSldUIEJ1aWxkZXIiLCJpYXQiOjE1MjM1NTk0NjMsImV4cCI6OTk5OTk5OTk5OTksImF1ZCI6Ind3dy5leGFtcGxlLmNvbSIsInN1YiI6Impyb2NrZXRAZXhhbXBsZS5jb20iLCJHaXZlbk5hbWUiOiJKb2hubnkiLCJTdXJuYW1lIjoiUm9ja2V0IiwiRW1haWwiOiJqcm9ja2V0QGV4YW1wbGUuY29tIiwiUm9sZSI6WyJNYW5hZ2VyIiwiUHJvamVjdCBBZG1pbmlzdHJhdG9yIl19.7hSvPvYkkcBbU69xcuvlUPn7kt1B3dvhz38nL34AykQ';
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
});
