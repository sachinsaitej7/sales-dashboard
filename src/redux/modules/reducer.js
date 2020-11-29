import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';

import auth from './auth.js';

const appReducer = combineReducers({
  routing: routerReducer,
  auth,
});

export default function rootReducer(state, action){
  return appReducer(state, action);
}
