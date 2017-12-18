import axios from 'axios';

import makeActionCreator from '../../utils/ActionHelpers';
import config from '../../config';

export const FCH_USER_DONE         = 'APP/FCH_USER_DONE';
export const CLR_USER              = 'APP/CLR_USER';
export const FCH_COMPANIES_DONE    = 'APP/FCH_COMPANIES_DONE';

export const fchUserDone           = makeActionCreator(FCH_USER_DONE, 'user');
export const clrUser               = makeActionCreator(CLR_USER);
export const fchCompaniesDone      = makeActionCreator(FCH_COMPANIES_DONE, 'companies');

export const fchUser = (auth, idToken) => {
	return dispatch => {
		auth.getUserInfo(idToken)
			.catch(err => console.log(err))
			.then(user => {
				dispatch(fchUserDone(user));
			})
	}
}

export const fchCompanies = () => {
	return dispatch => {
		axios.get(`${config.app_service_host}/company`)
			.then(resp => {
				dispatch(fchCompaniesDone(resp.data));
			})
	}
}
