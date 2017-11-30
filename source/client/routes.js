import React from 'react';
import { Router, Route, IndexRoute, browserHistory } from 'react-router';
import connectedAuthWrapper from 'redux-auth-wrapper/connectedAuthWrapper';

import App from './modules/App/Container';
import Home from './modules/Home/Container';
//import Subscription from './modules/Subscription/Container';

const Login = () => (
	<h1>Please login in first</h1>
)

const UserIsAuthenticated = connectedAuthWrapper({
	authenticatedSelector: state => (!state.getIn(['app', 'user']).isEmpty()),
	wrapperDisplayName: 'UserIsAuthenticated',
	FailureComponent: Login,
})

const Authenticated = UserIsAuthenticated((props) => props.children);

export default () => (
	<Router history={browserHistory} >
		<Route path="/" component={App}>
			<Route component={Authenticated}>
				<IndexRoute component={Home} />
				{/* <Route path='subscription' component={Subscription} /> */}
			</Route>
		</Route>
	</Router>
)
