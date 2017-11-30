import axios from 'axios';

import makeActionCreator from '../../utils/ActionHelpers';
import { urlB64ToUint8Array } from '../../utils/func';
import config from '../../config';

export const CHECK_IS_SUBSCRIBED_DONE    	  	 	 	= 'Subscription/CHECK_IS_SUBSCRIBED_DONE';
export const ADD_USER_SUBSCRIPTION_DONE    	   	 	= 'Subscription/ADD_USER_SUBSCRIPTION_DONE';
export const REMOVE_USER_SUBSCRIPTION_DONE        = 'Subscription/REMOVE_USER_SUBSCRIPTION_DONE';

export const checkIsSubscribedDone     	  		    = makeActionCreator(CHECK_IS_SUBSCRIBED_DONE, 'isSubscribed');
export const addUserSubscriptionDone       		    = makeActionCreator(ADD_USER_SUBSCRIPTION_DONE, 'subscription');
export const removeUserSubscriptionDone           = makeActionCreator(REMOVE_USER_SUBSCRIPTION_DONE, 'payload');

export const checkIsSubscribed = (userId) => {
	return dispatch => {
		axios({
			method: 'get',
			url: `http:\/\/localhost:3002/subscriptions/${userId}`
		})
		.then(payload => {
			if(payload.data) dispatch( checkIsSubscribedDone(true) )
			else dispatch( checkIsSubscribedDone(false) )
		})
	}
}

export const addUserSubscription = (userId) => {
	const applicationServerKey = urlB64ToUint8Array(config.push_server_public_key);
	
	return dispatch => {
		navigator.serviceWorker.getRegistration()
			.then(swReg => (
				swReg.pushManager.subscribe({
					userVisibleOnly: true,
					applicationServerKey: applicationServerKey
				})
			))
			.then(subscription => (
				axios({
					method: 'post',
					url: 'http://localhost:3002/subscriptions',
					headers: {
						'content-type': 'application/json'
					},
					data: {
						doc: {
							id: userId,
							subscription: subscription,
							user_id: userId
						}
					}
				})
			))
			.then(payload => {
				dispatch( addUserSubscriptionDone(payload) )
			})
	}
}

export const removeUserSubscription = (userId) => {
	const applicationServerKey = urlB64ToUint8Array(config.push_server_public_key);
	
	return dispatch => {
		axios({
			method: 'delete',
			url: `http:\/\/localhost:3002/subscriptions/${userId}`
		})
		.then(payload => dispatch(removeUserSubscriptionDone(payload)) )
	}
}
