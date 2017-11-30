import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from 'material-ui/styles';
import Grid from 'material-ui/Grid';
import Paper from 'material-ui/Paper';
import { red, green } from 'material-ui/colors';

const styles = {
	root: {
		width: '80%',
		margin: 'auto',
		padding: '20px'
	},
	half: {
		flexBasis: '50%',
		textAlign: 'center'
	},
	up: {
		color: red['A400']
	},
	down: {
		color: green['A400']
	}
}

class PriceCard extends React.Component {
	componentWillReceiveProps() {
	}

	render() {
		const { classes } = this.props;

		const data = [
			{ time: '2017-10-01', price: 4000},
		]

		return (
		<Paper className={classes.root}>
			<Grid container>
				<Grid item className={classes.half}>
					<h1>Bit:</h1>
				</Grid>
				<Grid item className={classes.up}>
					<h1>9312.38</h1>
				</Grid>
				<Grid item className={classes.half}>
					<h1>Ether:</h1>
				</Grid>
				<Grid item className={classes.down}>
					<h1>425.21</h1>
				</Grid>
			</Grid>
		</Paper>
		);
	}
}

PriceCard.propTypes = {
}

export default withStyles(styles)(PriceCard);
