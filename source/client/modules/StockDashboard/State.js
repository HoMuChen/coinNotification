import { combineReducers } from 'redux-immutable';
import Immutable from 'immutable';

import * as __ from './Actions';

const initLegalFoundationState = Immutable.fromJS({
	'1': [],
	'2': [],
	'3': [],
	'4': [],
});
const legalFoundation = (_=initLegalFoundationState, action) => {
	switch(action.type) {
		case __.FCH_LEGALFOUNDATION_DONE:
			return _.set(action.name, Immutable.fromJS(action.data))
		default:
			return _;
	}
}

const initTaiexState = Immutable.List()
const taiex = (_=initTaiexState, action) => {
	switch(action.type) {
		case __.FCH_TAIEX_DONE:
			return Immutable.fromJS(action.data);
		default:
			return _;
	}
}


export const stockDashboardReducer = combineReducers({
	taiex,
	legalFoundation,
})
