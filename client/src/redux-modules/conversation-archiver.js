import { axiosInstance } from '../utils/helpers';

const ARCHIVE_CONVERSATION_REQUEST = 'conversation-archiver/ARCHIVE_CONVERSATION_REQUEST';
const ARCHIVE_CONVERSATION_SUCCESS = 'conversation-archiver/ARCHIVE_CONVERSATION_SUCCESS';
const ARCHIVE_CONVERSATION_FAILURE = 'conversation-archiver/ARCHIVE_CONVERSATION_FAILURE';
const RESET_STATE = 'conversation-archiver/RESET_STATE';

export const actions = {
  ARCHIVE_CONVERSATION_REQUEST, ARCHIVE_CONVERSATION_SUCCESS, ARCHIVE_CONVERSATION_FAILURE,
};

export const initialState = {
  archiving: false, archived: false, error: null,
};

export default function reducer(state = initialState, action = {}) {
  switch (action.type) {
    case ARCHIVE_CONVERSATION_REQUEST: {
      return { ...state, archiving: true };
    }
    case ARCHIVE_CONVERSATION_SUCCESS: {
      return { ...state, archiving: false, archived: true };
    }
    case ARCHIVE_CONVERSATION_FAILURE: {
      return { ...state, archiving: false, error: action.payload };
    }
    case RESET_STATE: {
      return { ...initialState };
    }
    default: {
      return state;
    }
  }
}

export const archiveConversation = id => (dispatch) => {
  dispatch({ type: ARCHIVE_CONVERSATION_REQUEST });

  return axiosInstance({
    method: 'patch',
    url: `/conversations/${id}/`,
    data: {
      is_archived: true,
    },
  })
    .then(() => {
      dispatch({ type: ARCHIVE_CONVERSATION_SUCCESS });
    })
    .catch((error) => {
      dispatch({ type: ARCHIVE_CONVERSATION_FAILURE, payload: error.response.status });
    });
};

export const resetState = () => (dispatch) => {
  dispatch({ type: RESET_STATE });
};
