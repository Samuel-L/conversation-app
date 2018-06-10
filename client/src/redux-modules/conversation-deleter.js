import { axiosInstance } from '../utils/helpers';

const DELETE_CONVERSATION_REQUEST = 'conversation-deleter/DELETE_CONVERSATION_REQUEST';
const DELETE_CONVERSATION_SUCCESS = 'conversation-deleter/DELETE_CONVERSATION_SUCCESS';
const DELETE_CONVERSATION_FAILURE = 'conversation-deleter/DELETE_CONVERSATION_FAILURE';
const RESET_STATE = 'conversation-deleter/RESET_STATE';

export const actions = {
  DELETE_CONVERSATION_REQUEST, DELETE_CONVERSATION_SUCCESS, DELETE_CONVERSATION_FAILURE,
};

export const initialState = {
  deleting: false, deleted: false, error: null,
};

export default function reducer(state = initialState, action = {}) {
  switch (action.type) {
    case DELETE_CONVERSATION_REQUEST: {
      return { ...state, deleting: true };
    }
    case DELETE_CONVERSATION_SUCCESS: {
      return { ...state, deleting: false, deleted: true };
    }
    case DELETE_CONVERSATION_FAILURE: {
      return { ...state, deleting: false, error: action.payload };
    }
    case RESET_STATE: {
      return { ...initialState };
    }
    default: {
      return state;
    }
  }
}


export const deleteConversation = id => (dispatch) => {
  dispatch({ type: DELETE_CONVERSATION_REQUEST });

  return axiosInstance({
    method: 'delete',
    url: `/conversations/${id}/`,
  })
    .then(() => {
      dispatch({ type: DELETE_CONVERSATION_SUCCESS });
    })
    .catch((error) => {
      dispatch({ type: DELETE_CONVERSATION_FAILURE, payload: error.response.status });
    });
};

export const resetState = () => (dispatch) => {
  dispatch({ type: RESET_STATE });
};
