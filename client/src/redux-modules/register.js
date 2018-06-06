import axios from 'axios';
import HttpStatus from 'http-status-codes';

import { apiURL } from '../utils/helpers';

const USER_REGISTER_REQUEST = 'register/USER_REGISTER_REQUEST';
const USER_REGISTER_SUCCESS = 'register/USER_REGISTER_SUCCESS';
const USER_REGISTER_FAILURE = 'register/USER_REGISTER_FAILURE';
const USERNAME_TAKEN = 'register/USERNAME_TAKEN';
const REMOVE_ERROR = 'register/REMOVE_ERROR';

export const actions = {
  USER_REGISTER_REQUEST, USER_REGISTER_SUCCESS, USER_REGISTER_FAILURE, REMOVE_ERROR,
};

export const initialState = {
  registering: false, registered: false, error: null, usernameTaken: false,
};

export default function reducer(state = initialState, action = {}) {
  switch (action.type) {
    case USER_REGISTER_REQUEST: {
      return { ...state, registering: true };
    }
    case USER_REGISTER_SUCCESS: {
      return { ...state, registering: false, registered: true };
    }
    case USER_REGISTER_FAILURE: {
      return { ...state, registering: false, error: action.payload };
    }
    case USERNAME_TAKEN: {
      return { ...state, usernameTaken: true };
    }
    case REMOVE_ERROR: {
      return { ...initialState };
    }
    default: {
      return state;
    }
  }
}

export const registerUser = (username, password) => (dispatch) => {
  dispatch({ type: USER_REGISTER_REQUEST });

  const headers = { 'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*' };
  const payload = { username, password };

  return axios.post(`${apiURL}/register/`, payload, headers)
    .then(() => {
      dispatch({ type: USER_REGISTER_SUCCESS });
    })
    .catch((error) => {
      dispatch({ type: USER_REGISTER_FAILURE, payload: error.response.status });
      if (error.response.status === HttpStatus.BAD_REQUEST) {
        dispatch({ type: USERNAME_TAKEN });
      }
    });
};

export const removeError = () => (dispatch) => {
  dispatch({ type: REMOVE_ERROR });
};
