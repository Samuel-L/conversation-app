import { axiosInstance } from '../utils/helpers';

const SEND_MESSAGE_REQUEST = 'conversation-creator/SEND_MESSAGE_REQUEST';
const SEND_MESSAGE_SUCCESS = 'conversation-creator/SEND_MESSAGE_SUCCESS';
const SEND_MESSAGE_FAILURE = 'conversation-creator/SEND_MESSAGE_FAILURE';
const RESET_STATE = 'conversation-creator/RESET_STATE';

export const actions = {
  SEND_MESSAGE_REQUEST, SEND_MESSAGE_SUCCESS, SEND_MESSAGE_FAILURE,
};

export const initialState = {
  sending: false, sent: false, error: null,
};

export default function reducer(state = initialState, action = {}) {
  switch (action.type) {
    case SEND_MESSAGE_REQUEST: {
      return { ...state, sending: true };
    }
    case SEND_MESSAGE_SUCCESS: {
      return { ...state, sending: false, sent: true };
    }
    case SEND_MESSAGE_FAILURE: {
      return { ...state, sending: false, error: action.payload };
    }
    case RESET_STATE: {
      return { ...initialState };
    }
    default: {
      return state;
    }
  }
}

export const sendMessage = (conversationID, message) => (dispatch) => {
  dispatch({ type: SEND_MESSAGE_REQUEST });

  return axiosInstance({
    method: 'post',
    url: '/messages/',
    data: {
      is_read: false,
      body: message,
      conversation: conversationID,
    },
  })
    .then(() => {
      dispatch({ type: SEND_MESSAGE_SUCCESS });
    })
    .catch((error) => {
      dispatch({ type: SEND_MESSAGE_FAILURE, payload: error.response.status });
    });
};

export const resetState = () => (dispatch) => {
  dispatch({ type: RESET_STATE });
};
