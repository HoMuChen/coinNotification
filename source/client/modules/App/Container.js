import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import decode from 'jwt-decode';

import { Layout, Menu, Icon, Dropdown, Avatar, Button } from 'antd';
const { Header, Sider, Content, Footer } = Layout;

import SideNav from '../../components/SideNav';

import Auth from '../../utils/Auth';
import { fchUser, fchUserDone, clrUser, fchCompanies } from './Actions'

class App extends React.Component{
	constructor() {
		super();
		this.auth = new Auth();
		this.state = {
			collapsed: false	
		}
	}

	componentDidMount() {
		const idToken = localStorage.getItem('id_token');
		if(idToken) {
			const decodedJWT = decode(idToken);
			if(Date.now() > decodedJWT.exp*1000) {
				this.handleLogout();
			}else {
				this.props.fchUserDone({ id: decodedJWT.sub, email: decodedJWT.email });
			}
		}

		this.auth.handleAuthenticated()
			.then(authResult => {
				if(authResult) {
					localStorage.setItem('id_token', authResult.idToken);
					this.props.fchUserDone({ id: authResult.idTokenPayload.sub, email: authResult.idTokenPayload.email });
				}
			})

		this.props.fchCompanies();
	}

	handleLogin = () => {
		this.auth.login();
	}

	handleLogout = () => {
		this.auth.logout();
		this.props.clrUser();
	}

	handleUserBtnClick = ({ item, key, keyPath }) => {
		if(key == 'logout') this.handleLogout();
	}

	toggle = () => {
		this.setState({ collapsed: !this.state.collapsed })
	}

	handleRWDCollapse = (collapsed) => {
		this.setState({collapsed: collapsed});
	}

	render() {
		const isLoggedIn = !this.props.user.isEmpty();
		
		const menu = (
			<Menu selectedKeys={[]} onClick={this.handleUserBtnClick}>
      	<Menu.Item disabled><Icon type="user" />個人中心</Menu.Item>
      	<Menu.Item disabled><Icon type="setting" />設置</Menu.Item>
      	<Menu.Divider />
      	<Menu.Item key="logout"><Icon type="logout" />退出登錄</Menu.Item>
    	</Menu>
		)

		const UserBtn = () => (
			isLoggedIn
			?	<Dropdown overlay={menu}>
      		<Avatar
						style={{ verticalAlign: 'middle', color: '#fff', backgroundColor: 'rgb(0, 33, 64)'}}
					>
						{ this.props.user.get('email').split('@')[0].slice(0, 2) }
					</Avatar>
				</Dropdown>
			: <Button type='promary' onClick={this.handleLogin}>登入</Button>
    );

		return (
			<Layout>
				<Sider
					collapsed={this.state.collapsed}
					trigger={null}
					width='256'
					breakpoint="md"
					onCollapse={ this.handleRWDCollapse }
				>
					<div style={{ height: 64, background: '#002140', margin: 0, marginBottom: 24}} />
					<SideNav />
				</Sider>
				<Layout>
					<Header style={{ background: '#fff', padding: 0 }}>
						<Icon
              style={{ fontSize: 18, padding: '0 24px', cursor: 'pointer', transition: 'color .3s' }}
              type={this.state.collapsed ? 'menu-unfold' : 'menu-fold'}
              onClick={this.toggle}
            />
						<div style={{ float: 'right', marginRight: 24 }}>
							<UserBtn />
						</div>
					</Header>
					<Content style={{ padding: 24 }}>
						<div style={{ minHeight: 780 }}>
							{ this.props.children }
						</div>
					</Content>
				</Layout>
			</Layout>
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
		fchCompanies,
	}
)(App)
