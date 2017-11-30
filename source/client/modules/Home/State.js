import { combineReducers } from 'redux-immutable';
import Immutable from 'immutable';

import * as __ from './Actions';

const alertsInitState = Immutable.OrderedMap()
const alerts = (_=alertsInitState, action) => {
	switch(action.type) {
		case __.FCH_ALERTS_DONE:
			return Immutable.fromJS(action.alerts)
					.map( row => Immutable.OrderedMap().set(row.get('id'), row) )
					.reduce( (cur, next, _) => cur.merge(next), Immutable.OrderedMap() )
		case __.ADD_ALERT_DONE:
			return _.set(action.id, Immutable.fromJS(action.alert));
		case __.DELETE_ALERT_DONE:
			return _.delete(action.id);
		default:
			return _;
	}
}

const isSubscribed = (_=false, action) => {
	switch(action.type) {
		case __.CHECK_IS_SUBSCRIBED_DONE:
			return action.isSubscribed;
		case __.ADD_USER_SUBSCRIPTION_DONE:
			console.log(action.subscription)
			return true;
		case __.REMOVE_USER_SUBSCRIPTION_DONE:
			return false;
		default:
			return _;
	}
}

const isAddingAlert = (_=false, action) => {
	switch(action.type) {
		case __.TGL_ADDING_ALERT:
			return !_;
		default:
			return _;
	}
}

export const homeReducer = combineReducers({
	alerts,
	isAddingAlert,
	isSubscribed,
})
