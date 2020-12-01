import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';

import auth from './auth.js';
import firestore from './firestore';

const appReducer = combineReducers({
  routing: routerReducer,
  auth,
  firestore,
});

export default function rootReducer(state, action){
  return appReducer(state, action);
}
