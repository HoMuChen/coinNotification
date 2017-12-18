import { combineReducers } from 'redux-immutable';
import Immutable from 'immutable';

import * as __ from './Actions';

const companyIdInput = (_="", action) => {
	switch(action.type) {
		case __.CNG_COMPANY_INPUT:
			return action.input;
		case __.CLR_COMPANY_INPUT:
			return "";
		default:
			return _;
	}
}

const initUserReportsState = Immutable.OrderedMap()
const userReports = (_=initUserReportsState, action) => {
	switch(action.type) {
		case __.FCH_STOCK_REPORTS_DONE:
			return Immutable.fromJS(action.reports)
					.map( row => Immutable.OrderedMap().set(row.get('id'), row) )
					.reduce( (cur, next, _) => cur.merge(next), Immutable.OrderedMap() )
		case __.ADD_STOCK_REPORT_DONE:
			return _.set( action['id'], Immutable.fromJS(action.doc).merge(Immutable.Map({id: action['id']})) );
		case __.DELETE_STOCK_REPORT_DONE:
			return _.delete(action['id']);
		default:
			return _;
	}
}

const initPriceState = Immutable.OrderedMap()
const price = (_=initPriceState, action) => {
	switch(action.type) {
		case __.FCH_PRICE_DONE:
			return _.set(action['company_id'], Immutable.fromJS(action.data));
		default:
			return _;
	}
}

const initDispersionState = Immutable.OrderedMap()
const dispersion = (_=initDispersionState, action) => {
	switch(action.type) {
		case __.FCH_DISPERSION_DONE:
			return _.set(action['company_id'], Immutable.fromJS(action.data));
		default:
			return _;
	}
}


export const stockReportReducer = combineReducers({
	companyIdInput,
	userReports,
	price,
	dispersion,
})
