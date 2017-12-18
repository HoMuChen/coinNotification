import { combineReducers } from 'redux-immutable';
import Immutable from 'immutable';

import * as __ from './Actions';

const userInitState = Immutable.Map()
const user = (_=userInitState, action) => {
	switch(action.type) {
		case __.FCH_USER_DONE:
			return Immutable.fromJS(action.user);
		case __.CLR_USER:
			return Immutable.Map();
		default:
			return _;
	}
}

const companiesInitState = Immutable.OrderedMap()
const companies = (_=companiesInitState, action) => {
	switch(action.type) {
		case __.FCH_COMPANIES_DONE:
			return Immutable.fromJS(action.companies)
				.map(company => Immutable.OrderedMap().set(company.get('id'), company))
				.reduce((cur, next) => cur.merge(next), Immutable.OrderedMap())
		default:
			return _;
	}
}
export const appReducer = combineReducers({
	user,
	companies,
})
