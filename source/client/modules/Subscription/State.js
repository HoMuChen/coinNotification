import { combineReducers } from 'redux-immutable';
import Immutable from 'immutable';

import * as __ from './Actions';

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

export const subscriptionReducer = combineReducers({
	isSubscribed,
})
