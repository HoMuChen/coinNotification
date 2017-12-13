import { combineReducers } from 'redux-immutable';
import Immutable from 'immutable';

import * as __ from './Actions';

const initPriceState = Immutable.fromJS({
	bit: [],
	eth: [],
	ltc: [],
});
const priceData = (_=initPriceState, action) => {
	switch(action.type) {
		case __.FCH_PRICE_DONE:
			return _.set(action.coin, Immutable.fromJS(action.price))
		default:
			return _;
	}
}

const initPriceChangePercentageState = Immutable.OrderedMap({
	'bit': 0,
	'eth': 0,
	'ltc': 0
});
const priceChangePercentage = (_=initPriceChangePercentageState, action) => {
	switch(action.type) {
		case __.FCH_PRICE_DONE:
			const prices = Immutable.fromJS(action.price);
			const lastestPrice = prices.first().get('price');
			const oneDayAgoPrice = prices.last().get('price');
			const changePercentage = Math.round(((lastestPrice - oneDayAgoPrice)/oneDayAgoPrice)*10000)/100
			return _.set(action.coin, changePercentage)
		default:
			return _;
	}
}


const initPriceAvgState = Immutable.OrderedMap({
	'bit': 0,
	'eth': 0,
	'ltc': 0
});
const priceAvg = (_=initPriceAvgState, action) => {
	switch(action.type) {
		case __.FCH_PRICE_DONE:
			const sum = action.price.map(p => p.price).reduce((x, y) => x+y, 0);
			const avg = Number((sum/action.price.length).toFixed(0));
			return _.set(action.coin, avg)
		default:
			return _;
	}
}


const selectedCoin = (_='bit', action) => {
	switch(action.type) {
		case __.SELECT_COIN:
			return action.coin;
		default:
			return _;
	}
}

export const homeReducer = combineReducers({
	priceData,
	priceChangePercentage,
	priceAvg,
	selectedCoin,
})
