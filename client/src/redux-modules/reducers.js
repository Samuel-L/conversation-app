import { combineReducers } from 'redux';

import registerReducer from './register';
import authReducer from './auth';
import conversationCreatorReducer from './conversation-creator';

export default combineReducers({
  registerReducer,
  authReducer,
  conversationCreatorReducer,
});
