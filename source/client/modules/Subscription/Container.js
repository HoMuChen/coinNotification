import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Toggle from 'material-ui/Toggle';


import { checkIsSubscribed, addUserSubscription, removeUserSubscription } from './Actions';

class Subscription extends React.Component{
	constructor() {
		super();
	}

	componentDidMount() {
		this.props.checkIsSubscribed(this.props.user.get('id'));
	}

	handleTglSubscription = (event, value) => {
		if(value) this.props.addUserSubscription(this.props.user.get('id'));
		if(!value) this.props.removeUserSubscription(this.props.user.get('id'));
	}

	render() {
		return (
				<div>
					<Toggle
					  label="Push subscription"
						toggled={this.props.isSubscribed}
						onToggle={this.handleTglSubscription}
					/>
				</div>
		);
	}
}

export default connect(
	(state, props) => ({
		children:			props.children,
		user:					state.getIn(['app', 'user']),
		isSubscribed:	state.getIn(['subscription', 'isSubscribed'])
	}),{
		checkIsSubscribed,
		addUserSubscription,
		removeUserSubscription,
	}
)(Subscription)
