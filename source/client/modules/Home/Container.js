import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Grid from 'material-ui/Grid';
import PriceCard from '../../components/PriceCard';
import SubscriptionTable from '../../components/SubscriptionTable';

import { fchAlerts, addAlert, deleteAlert, tglAddingAlert, checkIsSubscribed, addUserSubscription, removeUserSubscription} from './Actions';

class Home extends React.Component{
	componentDidMount() {
		this.props.fchAlerts(this.props.user_id);
		this.props.checkIsSubscribed(this.props.user_id);
	}

	render() {
		return (
			<Grid container direction='column' alignItems='center'>
				<Grid item style={{ width: '100%', marginTop: 20 }}>
					<PriceCard />
				</Grid>
				<Grid item style={{ width: '100%', marginTop: 20 }}>
					<SubscriptionTable
						user_id={this.props.user_id}
						alerts={this.props.alerts}
						isAddingAlert={this.props.isAddingAlert}
						addAlert={this.props.addAlert}
						deleteAlert={this.props.deleteAlert}
						isSubscribed={this.props.isSubscribed}
						tglAddingAlert={this.props.tglAddingAlert}
						addUserSubscription={this.props.addUserSubscription}
						removeUserSubscription={this.props.removeUserSubscription}
					/>
				</Grid>
			</Grid>
		);
	}
}

export default connect((state) => ({
  user_id:             state.getIn(['app', 'user', 'id']),
	alerts:              state.getIn(['home', 'alerts']),
	isAddingAlert:       state.getIn(['home', 'isAddingAlert']),
	isSubscribed:        state.getIn(['home', 'isSubscribed']),
}),{
	fchAlerts,
  addAlert,
	deleteAlert,
	checkIsSubscribed,
	tglAddingAlert,
	addUserSubscription,
	removeUserSubscription,
})(Home)
