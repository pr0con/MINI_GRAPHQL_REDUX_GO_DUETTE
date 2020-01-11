//Parent of Child reducers
import { combineReducers } from 'redux';

import appReducer from './appReducer.js';

const rr = combineReducers({
	app: appReducer
})

export default rr;