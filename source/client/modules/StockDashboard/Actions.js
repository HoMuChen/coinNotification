import axios from 'axios';

import makeActionCreator from '../../utils/ActionHelpers';
import config from '../../config';

export const FCH_TAIEX_DONE                        ='stockDashboard/FCH_TAIEX_DONE';
export const FCH_LEGALFOUNDATION_DONE              ='stockDashboard/FCH_LEGALFOUNDATION_DONE';

export const fchTaiexDone                          = makeActionCreator(FCH_TAIEX_DONE, 'data');
export const fchLegalFoundationDone                = makeActionCreator(FCH_LEGALFOUNDATION_DONE, 'name', 'data');

export const fchLegalFoundation = (name) => {
  return dispatch => {
		axios.get(`${config.app_service_host}/legal_foundation/${name}`)
			.then(resp => {
				dispatch( fchLegalFoundationDone(name, resp.data) )
			})
	}
};

export const fchTaiex = (limit) => {
  return dispatch => {
		axios.get(`${config.app_service_host}/taiex/limit/${limit}`)
			.then(resp => {
				dispatch( fchTaiexDone(resp.data) )
			})
	}
};

