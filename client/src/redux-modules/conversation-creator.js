import { axiosInstance } from '../utils/helpers';

const CREATE_CONVERSATION_REQUEST = 'conversation-creator/CREATE_CONVERSATION_REQUEST';
const CREATE_CONVERSATION_SUCCESS = 'conversation-creator/CREATE_CONVERSATION_SUCCESS';
const CREATE_CONVERSATION_FAILURE = 'conversation-creator/CREATE_CONVERSATION_FAILURE';
const RESET_STATE = 'conversation-creator/RESET_STATE';

export const actions = {
  CREATE_CONVERSATION_REQUEST, CREATE_CONVERSATION_SUCCESS, CREATE_CONVERSATION_FAILURE,
};

export const initialState = {
  creating: false, created: false, error: null,
};

export default function reducer(state = initialState, action = {}) {
  switch (action.type) {
    case CREATE_CONVERSATION_REQUEST: {
      return { ...state, creating: true };
    }
    case CREATE_CONVERSATION_SUCCESS: {
      return { ...state, creating: false, created: true };
    }
    case CREATE_CONVERSATION_FAILURE: {
      return { ...state, creating: false, error: action.payload };
    }
    case RESET_STATE: {
      return { ...initialState };
    }
    default: {
      return state;
    }
  }
}

export const createConversation = (topic, username) => (dispatch) => {
  dispatch({ type: CREATE_CONVERSATION_REQUEST });

  return axiosInstance({
    method: 'post',
    url: '/conversations/',
    data: {
      topic,
      is_archived: false,
      user_b: username,
    },
  })
    .then(() => {
      dispatch({ type: CREATE_CONVERSATION_SUCCESS });
    })
    .catch((error) => {
      dispatch({ type: CREATE_CONVERSATION_FAILURE, payload: error.response.status });
    });
};

export const resetState = () => (dispatch) => {
  dispatch({ type: RESET_STATE });
};
