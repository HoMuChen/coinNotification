import { combineReducers } from 'redux-immutable';

import { appReducer } from './modules/App/State';
import { homeReducer } from './modules/Home/State';
import { alertReducer } from './modules/Alert/State';

const Reducers = combineReducers({
	app:          appReducer,
	home:         homeReducer,
	alert:        alertReducer,
})

export default Reducers;
