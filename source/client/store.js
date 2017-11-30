import { createStore, applyMiddleware } from 'redux';
import thunkMiddleware from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension';

import Reducers from './reducers';

const store = createStore(
	Reducers,
	composeWithDevTools(applyMiddleware(thunkMiddleware))
);

export default store;
