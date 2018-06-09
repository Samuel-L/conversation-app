import { fetchConversationsPromise, fetchMessagesPromise } from './helpers/backendPromises';
import createParsers from './helpers/parserHelpers';

const FETCH_CONVERSATIONS_REQUEST = 'conversations-fetcher/FETCH_CONVERSATIONS_REQUEST';
const FETCH_CONVERSATIONS_SUCCESS = 'conversations-fetcher/FETCH_CONVERSATIONS_SUCCESS';
const FETCH_CONVERSATIONS_FAILURE = 'conversations-fetcher/FETCH_CONVERSATIONS_FAILURE';
const RESET_STATE = 'conversations-fetcher/RESET_STATE';

export const actions = {
  FETCH_CONVERSATIONS_REQUEST, FETCH_CONVERSATIONS_SUCCESS, FETCH_CONVERSATIONS_FAILURE,
};

export const initialState = {
  fetching: false, fetched: false, error: null, conversations: [],
};

export default function reducer(state = initialState, action = {}) {
  switch (action.type) {
    case FETCH_CONVERSATIONS_REQUEST: {
      return { ...state, fetching: true };
    }
    case FETCH_CONVERSATIONS_SUCCESS: {
      return {
        ...state,
        fetching: false,
        fetched: true,
        conversations: action.payload,
      };
    }
    case FETCH_CONVERSATIONS_FAILURE: {
      return { ...state, fetching: false, error: action.payload };
    }
    case RESET_STATE: {
      return { ...initialState };
    }
    default: {
      return state;
    }
  }
}


export const fetchConversations = () => (dispatch) => {
  dispatch({ type: FETCH_CONVERSATIONS_REQUEST });

  return fetchConversationsPromise()
    .then((response) => {
      const conversations = response.data;
      fetchMessagesPromise(conversations)
        .then((mResponse) => {
          const messages = mResponse.map(list => list.data);
          const parsers = createParsers(conversations, messages);

          dispatch({ type: FETCH_CONVERSATIONS_SUCCESS, payload: parsers });
        })
        .catch((mError) => {
          dispatch({ type: FETCH_CONVERSATIONS_FAILURE, payload: mError.response.status });
        });
    })
    .catch((error) => {
      dispatch({ type: FETCH_CONVERSATIONS_FAILURE, payload: error.response.status });
    });
};

export const resetState = () => (dispatch) => {
  dispatch({ type: RESET_STATE });
};
