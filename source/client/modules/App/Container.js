import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import decode from 'jwt-decode';

import Navigator from '../../components/Navigator';

import Auth from '../../utils/Auth';
import { fchUser, fchUserDone, clrUser } from './Actions'

class App extends React.Component{
	constructor() {
		super();
		this.auth = new Auth();
	}

	componentDidMount() {
		const idToken = localStorage.getItem('id_token');
		if(idToken) {
			const decodedJWT = decode(idToken);
			this.props.fchUserDone({ id: decodedJWT.sub, email: decodedJWT.email });
		}

		this.auth.handleAuthenticated()
			.then(authResult => {
				if(authResult) {
					localStorage.setItem('id_token', authResult.idToken);
					this.props.fchUserDone({ id: authResult.idTokenPayload.sub, email: authResult.idTokenPayload.email });
				}
			})
	}

	render() {
		return (
			<div>
				<Navigator auth={this.auth} user={this.props.user} clrUser={this.props.clrUser}/>
				{ this.props.children }
			</div>
		);
	}
}

export default connect(
	(state, props) => ({
		children:			props.children,
		user:					state.getIn(['app', 'user']),
	}),{
		fchUser,
		fchUserDone,
		clrUser,
	}
)(App)
