import { combineReducers } from 'redux';

import registerReducer from './register';
import authReducer from './auth';
import conversationCreatorReducer from './conversation-creator';
import conversationFetcherReducer from './conversation-fetcher';
import conversationDeleterReducer from './conversation-deleter';
import conversationArchiverReducer from './conversation-archiver';


export default combineReducers({
  registerReducer,
  authReducer,
  conversationCreatorReducer,
  conversationFetcherReducer,
  conversationDeleterReducer,
  conversationArchiverReducer,
});
