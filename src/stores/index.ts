import {createStore} from 'redux';
import combineReducers from './reducers';
import { Store } from 'redux'

const store :Store = createStore(combineReducers);

export default store;

