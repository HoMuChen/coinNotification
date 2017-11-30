import { combineReducers } from 'redux-immutable';

import { appReducer } from './modules/App/State';
import { homeReducer } from './modules/Home/State';

const Reducers = combineReducers({
	app:          appReducer,
	home:         homeReducer,
})

export default Reducers;
