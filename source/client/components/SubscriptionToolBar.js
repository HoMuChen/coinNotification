import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from 'material-ui/styles';
import Grid from 'material-ui/Grid';
import Paper from 'material-ui/Paper';
import Table, { TableBody, TableCell, TableHead, TableRow } from 'material-ui/Table';
import Button from 'material-ui/Button'
import AddIcon from 'material-ui-icons/Add';
import Switch from 'material-ui/Switch';
import Dialog, { DialogActions, DialogContent, DialogContentText, DialogTitle } from 'material-ui/Dialog';
import { FormControlLabel, FormGroup, FormControl } from 'material-ui/Form'
import Select from 'material-ui/Select';
import { MenuItem } from 'material-ui/Menu';
import Input, { InputLabel } from 'material-ui/Input';

import { red, green } from 'material-ui/colors';

const styles = {
	root: {
		width: '80%',
		margin: 'auto',
		padding: '20px',
	},
	form: {
		width: '300px'
	},
	up: {
		color: red['A400']
	},
	down: {
		color: green['A400']
	}
}

class SubscriptionsToolBar extends React.Component {
	constructor() {
		super();
		this.state = {
			coin: 'bit',
			trending: 'up',
			threshold: 0,
		}
	}

	componentWillReceiveProps() {
	}

	handleSubscritionChange = (e, checked) => {
		if(checked) this.props.addUserSubscription(this.props.user_id);
		else this.props.removeUserSubscription(this.props.user_id)
	}

	handleTglAddingAlert = () => {
		this.props.tglAddingAlert();
	}

	handleChange = (key) => (e) => {
		this.setState({ [key]: e.target.value })
	}

	handleAddAlert = () => {
		this.handleRequestClose();
		this.props.addAlert(this.props.user_id, Object.assign({}, this.state));
		this.setState({ coin: 'bit', trending: 'up', threshold: 0 });
	}

	handleRequestClose = () => {
		this.props.tglAddingAlert();
	}

	render() {
		const { classes, isSubscribed, isAddingAlert } = this.props;

		return (
			<Grid container justify='space-between'>
				<Grid item>
					<Button raised color='primary' onClick={this.handleTglAddingAlert}><AddIcon/></Button>
				</Grid>
				<Grid item>
					訂閱推播
					<Switch
						checked={isSubscribed}
						onChange={this.handleSubscritionChange}
					/>
				</Grid>
				<Dialog open={isAddingAlert} onRequestClose={this.handleRequestClose}>
					<DialogTitle>示警條件設定</DialogTitle>
					<DialogContent>
						<FormGroup className={classes.form}>
							<FormControl>
								<InputLabel htmlFor="coin-type">Coin</InputLabel>
								<Select
            			value={this.state.coin}
            			onChange={this.handleChange('coin')}
									input={<Input id="coin-type" />}
          			>
									<MenuItem value='bit'>Bit</MenuItem>
									<MenuItem value='eth'>Ether</MenuItem>
								</Select>
        			</FormControl>
							<FormControl>
								<InputLabel htmlFor="trending">Trending</InputLabel>
								<Select
            			value={this.state.trending}
            			onChange={this.handleChange('trending')}
									input={<Input id="trending" />}
          			>
									<MenuItem value='up'>Up</MenuItem>
									<MenuItem value='down'>Down</MenuItem>
								</Select>
        			</FormControl>
							<FormControl>
								<InputLabel htmlFor="threshold">Theshold</InputLabel>
								<Input
            			value={this.state.threshold}
            			onChange={this.handleChange('threshold')}
									input={<Input id="threshold" />}
          			/>
        			</FormControl>
						</FormGroup>
					</DialogContent>
					<DialogActions>
            <Button onClick={this.handleRequestClose} color="primary">
              Cancel
            </Button>
            <Button onClick={this.handleAddAlert} color="primary" autoFocus>
              Add
            </Button>
          </DialogActions>
				</Dialog>
			</Grid>
		);
	}
}

SubscriptionsToolBar.propTypes = {
	user_id:                PropTypes.string.isRequired,
	isSubscribed:           PropTypes.bool.isRequired,
	isAddingAlert:          PropTypes.bool.isRequired,
	tglAddingAlert:         PropTypes.func.isRequired,
	addAlert:               PropTypes.func.isRequired,
	addUserSubscription:    PropTypes.func.isRequired,
	removeUserSubscription: PropTypes.func.isRequired,
}

export default withStyles(styles)(SubscriptionsToolBar);
