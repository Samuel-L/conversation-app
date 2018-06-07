import { combineReducers } from 'redux';

import registerReducer from './register';
import authReducer from './auth';

export default combineReducers({
  registerReducer,
  authReducer,
});