import { combineReducers } from 'redux';

import registerReducer from './register';
import authReducer from './auth';
import conversationCreatorReducer from './conversation-creator';
import conversationFetcherReducer from './conversation-fetcher';

export default combineReducers({
  registerReducer,
  authReducer,
  conversationCreatorReducer,
  conversationFetcherReducer,
});
