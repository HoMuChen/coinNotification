import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from 'material-ui/styles';
import Grid from 'material-ui/Grid';
import Paper from 'material-ui/Paper';
import Table, { TableBody, TableCell, TableHead, TableRow } from 'material-ui/Table';
import Button from 'material-ui/Button'
import DeleteIcon from 'material-ui-icons/Delete';
import TrendingDownIcon from 'material-ui-icons/TrendingDown';
import TrendingUpIcon from 'material-ui-icons/TrendingUp';
import AddIcon from 'material-ui-icons/Add';

import SubscriptionToolBar from './SubscriptionToolBar'

import { red, green } from 'material-ui/colors';

const styles = {
	root: {
		width: '80%',
		margin: 'auto',
		padding: '20px',
	},
	table: {
		marginTop: '20px',
	},
	up: {
		color: red['A400']
	},
	down: {
		color: green['A400']
	}
}

class SubscriptionTable extends React.Component {
	componentWillReceiveProps() {
	}

	handleDeleteAlert = (id) => () => {
		this.props.deleteAlert(id);
	}

	render() {
		const { classes, user_id, alerts, isAddingAlert, addAlert, tglAddingAlert, isSubscribed, addUserSubscription, removeUserSubscription } = this.props;

		return (
		<Paper className={classes.root}>
			<SubscriptionToolBar
				user_id={user_id}
				isSubscribed={isSubscribed}
				isAddingAlert={isAddingAlert}
				addAlert={addAlert}
				tglAddingAlert={tglAddingAlert}
				addUserSubscription={addUserSubscription}
				removeUserSubscription={removeUserSubscription}
			/>
			<Table className={classes.table}>
				<TableHead>
					<TableRow>
						<TableCell>Coin</TableCell>
						<TableCell>Trending</TableCell>
						<TableCell>Threshold</TableCell>
						<TableCell>Delete</TableCell>
					</TableRow>
				</TableHead>
				<TableBody>
					{alerts.valueSeq().toArray().map(row => (
						<TableRow key={row.get('id')}>
							<TableCell>{row.get('coin')}</TableCell>
							<TableCell className={(row.get('trending') == 'up')? classes.up: classes.down}>
								{(row.get('trending') == 'up')
									? <TrendingUpIcon color='inherit'/>
									: <TrendingDownIcon color='inherit'/>}
							</TableCell>
							<TableCell>{row.get('threshold')}</TableCell>
							<TableCell><Button onClick={this.handleDeleteAlert(row.get('id'))}><DeleteIcon/></Button></TableCell>
						</TableRow>
					))}
				</TableBody>
			</Table>
		</Paper>
		);
	}
}

SubscriptionTable.propTypes = {
	user_id:                      PropTypes.string.isRequired,
	alerts:                       PropTypes.object.isRequired,
	isSubscribed:                 PropTypes.bool.isRequired,
	isAddingAlert:                PropTypes.bool.isRequired,
	addAlert:                     PropTypes.func.isRequired,
	deleteAlert:                  PropTypes.func.isRequired,
	tglAddingAlert:               PropTypes.func.isRequired,
	addUserSubscription:          PropTypes.func.isRequired,
	removeUserSubscription:       PropTypes.func.isRequired,
}

export default withStyles(styles)(SubscriptionTable);
