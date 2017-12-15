import { combineReducers } from 'redux-immutable';

import { appReducer } from './modules/App/State';
import { stockDashboardReducer } from './modules/StockDashboard/State';
import { homeReducer } from './modules/Home/State';
import { alertReducer } from './modules/Alert/State';

const Reducers = combineReducers({
	app:          appReducer,
	home:         homeReducer,
	stock:        stockDashboardReducer,
	alert:        alertReducer,
})

export default Reducers;
