import axios from 'axios';

import makeActionCreator from '../../utils/ActionHelpers';
import { urlB64ToUint8Array } from '../../utils/func';
import config from '../../config';

export const FCH_ALERTS_DONE                       = 'alert/FCH_ALERTS_DONE';
export const ADD_ALERT_DONE                        = 'alert/ADD_ALERT_DONE';
export const DELETE_ALERT_DONE                     = 'alert/DELETE_ALERT_DONE';
export const TGL_ADDING_ALERT                      = 'alert/TGL_ADDING_ALERT';

export const CHECK_IS_SUBSCRIBED_DONE              = 'Subscription/CHECK_IS_SUBSCRIBED_DONE';
export const ADD_USER_SUBSCRIPTION_DONE            ='Subscription/ADD_USER_SUBSCRIPTION_DONE';
export const REMOVE_USER_SUBSCRIPTION_DONE         ='Subscription/REMOVE_USER_SUBSCRIPTION_DONE';

export const fchAlertsDone                         = makeActionCreator(FCH_ALERTS_DONE, 'alerts');
export const addAlertDone                          = makeActionCreator(ADD_ALERT_DONE, 'id', 'alert');
export const deleteAlertDone                       = makeActionCreator(DELETE_ALERT_DONE, 'id');
export const tglAddingAlert                        = makeActionCreator(TGL_ADDING_ALERT);

export const checkIsSubscribedDone                 = makeActionCreator(CHECK_IS_SUBSCRIBED_DONE, 'isSubscribed');
export const addUserSubscriptionDone               = makeActionCreator(ADD_USER_SUBSCRIPTION_DONE, 'subscription');
export const removeUserSubscriptionDone            = makeActionCreator(REMOVE_USER_SUBSCRIPTION_DONE, 'payload');

export const fchAlerts = userId => {
  return dispatch => {
		axios({
			method: 'get',
			headers: {
				"Authorization": `Bearer ${localStorage.getItem('id_token')}`
			},
			url: `${config.app_service_host}/alerts/${userId}`
		})
		.then(resp => {
			dispatch( fchAlertsDone(resp.data) )
		})
  };
};

export const addAlert = (userId, alert) => {
	
  return dispatch => {
    axios({
      method: 'post',
      url: `${config.app_service_host}/alerts`,
      headers: {
				"Authorization": `Bearer ${localStorage.getItem('id_token')}`,
        'content-type': 'application/json',
      },
      data: {
        doc: {
          ...alert,
          user_id: userId,
        },
      },
    })
		.then(payload => {
			dispatch(addAlertDone(payload.data.generated_keys[0], alert))
		})
  };
	
	return dispatch => {
		dispatch(addAlertDone(Object.assign({user_id: userId, id: Math.random()}, alert)))
	}
};

export const deleteAlert = (id) => {
	return dispatch => {
    axios({
      method: 'delete',
      url: `${config.app_service_host}/alerts/${id}`,
      headers: {
				"Authorization": `Bearer ${localStorage.getItem('id_token')}`,
			}
    })
		.then( _ => {
			dispatch(deleteAlertDone(id))
		})
	}
}

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
