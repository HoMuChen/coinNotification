import axios from 'axios';

import makeActionCreator from '../../utils/ActionHelpers';
import { urlB64ToUint8Array } from '../../utils/func';
import config from '../../config';

export const SELECT_COIN                           = 'alert/SELECT_COIN';
export const FCH_PRICE_DONE                        = 'alert/FCH_PRICE_DONE';

export const CHECK_IS_SUBSCRIBED_DONE              = 'Subscription/CHECK_IS_SUBSCRIBED_DONE';
export const ADD_USER_SUBSCRIPTION_DONE            ='Subscription/ADD_USER_SUBSCRIPTION_DONE';
export const REMOVE_USER_SUBSCRIPTION_DONE         ='Subscription/REMOVE_USER_SUBSCRIPTION_DONE';

export const selectCoin                            = makeActionCreator(SELECT_COIN, 'coin');
export const fchPriceDone                          = makeActionCreator(FCH_PRICE_DONE, 'coin', 'price');

export const checkIsSubscribedDone                 = makeActionCreator(CHECK_IS_SUBSCRIBED_DONE, 'isSubscribed');
export const addUserSubscriptionDone               = makeActionCreator(ADD_USER_SUBSCRIPTION_DONE, 'subscription');
export const removeUserSubscriptionDone            = makeActionCreator(REMOVE_USER_SUBSCRIPTION_DONE, 'payload');

export const fchPrice = (coin) => {
  return dispatch => {
		axios.get(`${config.app_service_host}/coin_price/${coin}`)
			.then(resp => {
				dispatch( fchPriceDone(coin, resp.data) )
			})
	}
};

export const checkIsSubscribed = userId => {
  return dispatch => {
    axios({
      method: 'get',
			headers: {
				"Authorization": `Bearer ${localStorage.getItem('id_token')}`
			},
      url: `${config.push_service_host}/subscriptions/${userId}`,
    }).then(payload => {
      if (payload.data) dispatch(checkIsSubscribedDone(true));
      else dispatch(checkIsSubscribedDone(false));
    });
  };
};

export const addUserSubscription = userId => {
  const applicationServerKey = urlB64ToUint8Array(config.push_server_public_key);

  return dispatch => {
    navigator.serviceWorker
      .getRegistration()
      .then(swReg =>
        swReg.pushManager.subscribe({
          userVisibleOnly: true,
          applicationServerKey: applicationServerKey,
        })
      )
      .then(subscription =>
        axios({
          method: 'post',
          url: `${config.push_service_host}/subscriptions`,
          headers: {
            'content-type': 'application/json',
						"Authorization": `Bearer ${localStorage.getItem('id_token')}`
          },
          data: {
            doc: {
              id: userId,
              subscription: subscription,
              user_id: userId,
            },
          },
        })
      )
      .then(payload => {
        dispatch(addUserSubscriptionDone(payload));
      });
  };
};

export const removeUserSubscription = userId => {
  const applicationServerKey = urlB64ToUint8Array(config.push_server_public_key);

  return dispatch => {
    axios({
      method: 'delete',
			headers: {
				"Authorization": `Bearer ${localStorage.getItem('id_token')}`,
			},
      url: `${config.push_service_host}/subscriptions/${userId}`,
    }).then(payload => dispatch(removeUserSubscriptionDone(payload)));
  };
};
