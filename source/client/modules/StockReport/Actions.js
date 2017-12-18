import axios from 'axios';

import makeActionCreator from '../../utils/ActionHelpers';
import config from '../../config';

export const FCH_DISPERSION_DONE                   ='stockReport/FCH_DISPERSION_DONE';
export const FCH_PRICE_DONE                        ='stockReport/FCH_PRICE_DONE';
export const ADD_STOCK_REPORT_DONE                 ='stockReport/ADD_STOCK_REPORT_DONE';
export const FCH_STOCK_REPORTS_DONE                ='stockReport/FCH_STOCK_REPORTS_DONE';
export const DELETE_STOCK_REPORT_DONE              ='stockReport/DELETE_STOCK_REPORT_DONE';

export const CNG_COMPANY_INPUT                     ='stockReport/CNG_COMPANY_INPUT';
export const CLR_COMPANY_INPUT                     ='stockReport/CLR_COMPANY_INPUT';

export const fchDispersionDone                     = makeActionCreator(FCH_DISPERSION_DONE, 'company_id', 'data');
export const fchPriceDone                          = makeActionCreator(FCH_PRICE_DONE, 'company_id', 'data');
export const fchStockReportsDone                   = makeActionCreator(FCH_STOCK_REPORTS_DONE, 'reports');
export const addStockReportDone                    = makeActionCreator(ADD_STOCK_REPORT_DONE, 'id', 'doc');
export const deleteStockReportDone                 = makeActionCreator(DELETE_STOCK_REPORT_DONE, 'id');

export const changeCompanyInput                    = makeActionCreator(CNG_COMPANY_INPUT, 'input');
export const clearCompanyInput                     = makeActionCreator(CLR_COMPANY_INPUT);

export const fchPrice = (company_id) => {
	return dispatch => {
		axios({
			method: 'get',
			headers: {
				"Authorization": `Bearer ${localStorage.getItem('id_token')}`
			},
			url: `${config.app_service_host}/stock_price/company/${company_id}/limit/50`
		})
		.then(resp => {
			dispatch( fchPriceDone(company_id, resp.data) )
		})
	}
}

export const fchDispersion = (company_id) => {
	return dispatch => {
		axios({
			method: 'get',
			headers: {
				"Authorization": `Bearer ${localStorage.getItem('id_token')}`
			},
			url: `${config.app_service_host}/dispersion/company/${company_id}/level/15`
		})
		.then(resp => {
			dispatch( fchDispersionDone(company_id, resp.data) )
		})
	}
}

export const fchStockReports = (user_id) => {
	return dispatch => {
		axios({
			method: 'get',
			headers: {
				"Authorization": `Bearer ${localStorage.getItem('id_token')}`
			},
			url: `${config.app_service_host}/stockReport/${user_id}`
		})
		.then(resp => {
			dispatch( fchStockReportsDone(resp.data) )
		})
	}
}

export const addStockReport = (userId, doc) => {
  return dispatch => {
    axios({
      method: 'post',
      url: `${config.push_service_host}/stockReport`,
      headers: {
        'content-type': 'application/json',
				"Authorization": `Bearer ${localStorage.getItem('id_token')}`
      },
      data: {
				user_id: userId,
				...doc,
      },
    })
		.then(payload => {
			dispatch( addStockReportDone(payload.data.generated_keys[0], doc) )
		})
	}
};

export const deleteStockReport = (id) => {
  return dispatch => {
    axios({
      method: 'delete',
      url: `${config.push_service_host}/stockReport/${id}`,
      headers: {
        'content-type': 'application/json',
				"Authorization": `Bearer ${localStorage.getItem('id_token')}`
      }
    })
		.then(payload => {
			dispatch( deleteStockReportDone(id) )
		})
	}
};
