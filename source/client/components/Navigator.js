import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router';
import { withStyles } from 'material-ui/styles';
import AppBar from 'material-ui/AppBar';
import Toolbar from 'material-ui/Toolbar';
import Typography from 'material-ui/Typography';
import IconButton from 'material-ui/IconButton';
import MenuIcon from 'material-ui-icons/Menu';
import Button from 'material-ui/Button';
import Avatar from 'material-ui/Avatar';
import { red, green, indigo } from 'material-ui/colors';

const styles = theme => ({
  root: {
    //marginTop: theme.spacing.unit * 3,
    width: '100%',
  },
  flex: {
    flex: 1,
  },
	avatar: {
		color: indigo[500],
		backgroundColor: 'white'
	},
  menuButton: {
    marginLeft: -12,
    marginRight: 20,
  },
});

class Navigator extends React.Component {
	
	handleLogin = () => {
		this.props.auth.login();
	}

	handleLogout = () => {
		this.props.auth.logout();
		this.props.clrUser();
	}


	render() {
		const { classes } = this.props;

		const isLoggedIn = !this.props.user.isEmpty();

		const Logged = () => (
			<Avatar className={classes.avatar} onClick={this.handleLogout}>{this.props.user.get('email').split('@')[0]}</Avatar>
		)
		
		return (
		<div className={classes.root}>
			<AppBar position="static">
				<Toolbar>
					<IconButton className={classes.menuButton} color="contrast" aria-label="Menu">
            <MenuIcon />
          </IconButton>
          <Typography type="title" color="inherit" className={classes.flex}>
            Coin Notification
          </Typography>
					{
						isLoggedIn
							? <Logged />
          		: <Button color="contrast" onClick={this.handleLogin}>Login</Button>
					}
        </Toolbar>
			</AppBar>
		</div>
		);
	}
}

Navigator.propTypes = {
	auth:				PropTypes.object.isRequired,
	user:				PropTypes.object.isRequired,
	clrUser:		PropTypes.func.isRequired,
}

export default withStyles(styles)(Navigator);
