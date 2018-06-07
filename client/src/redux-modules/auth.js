import decode from 'jwt-decode';

const USER_LOGIN_REQUEST = 'auth/USER_LOGIN_REQUEST';
const USER_LOGIN_SUCCESS = 'auth/USER_LOGIN_SUCCESS';
const USER_LOGIN_FAILURE = 'auth/USER_LOGIN_FAILURE';
const USER_LOGOUT = 'auth/USER_LOGOUT';
const RESET_STATE = 'auth/RESET_STATE';

export const actions = {
  USER_LOGIN_REQUEST, USER_LOGIN_SUCCESS, USER_LOGIN_FAILURE, USER_LOGOUT, RESET_STATE,
};

export const isTokenExpired = (token) => {
  const decodedToken = decode(token);

  if (decodedToken.exp < Date.now() / 1000) {
    return true;
  }
  return false;
};

export const isLoggedIn = () => {
  const token = localStorage.getItem('token');

  return !!token && !isTokenExpired(token);
};

export const getInitialState = () => {
  let initialState = {
    loggedIn: false, loggingIn: false, error: null, jwtToken: '',
  };

  if (isLoggedIn()) {
    initialState = {
      ...initialState, loggedIn: true, jwtToken: localStorage.getItem('token'),
    };
  }
  return initialState;
};

export default (state = getInitialState(), action = {}) => {
  switch (action.type) {
    case USER_LOGIN_REQUEST: {
      return {
        ...state, loggingIn: true,
      };
    }
    case USER_LOGIN_SUCCESS: {
      return {
        ...state, loggedIn: true, loggingIn: false, jwtToken: action.payload,
      };
    }
    case USER_LOGIN_FAILURE: {
      return {
        ...state, loggingIn: false, error: action.payload,
      };
    }
    case USER_LOGOUT: {
      return {
        ...state, loggedIn: false, jwtToken: '',
      };
    }
    case RESET_STATE: {
      return getInitialState();
    }
    default: {
      return state;
    }
  }
};
