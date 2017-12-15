import React from 'react';
import { Router, Route, IndexRoute, browserHistory } from 'react-router';
import connectedAuthWrapper from 'redux-auth-wrapper/connectedAuthWrapper';
import Exception from 'ant-design-pro/lib/Exception';

import App from './modules/App/Container';
import Home from './modules/Home/Container';
import StockDashboard from './modules/StockDashboard/Container';
import Alert from './modules/Alert/Container';

const Login = () => (
	<Exception type="403" desc="請先登入" style={{ marginTop: 200 }}/>
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
			<IndexRoute component={Home} />
			<Route path='/twStock' component={StockDashboard} />
			<Route component={Authenticated}>
				<Route path='/alert' component={Alert} />
			</Route>
		</Route>
	</Router>
)
