import auth0 from 'auth0-js';
import config from '../config';

export default class Auth {
	constructor() {
		this.auth = new auth0.WebAuth({
			domain: `${config.auth0_domain}.auth0.com`,
			clientID: config.client_id,
			redirectUri: config.callback_url,
			audience: `https:\/\/${config.auth0_domain}.auth0.com/userinfo`,
			responseType: 'id_token',
			scope: 'openid email'
		})
	}

	login() {
		this.auth.authorize();
	}

	handleAuthenticated = () => {
		return new Promise((resolve, reject) => {
			this.auth.parseHash((err, authResult) => {
				if(err) console.log("-------auth parseHash error-------", err);
				if(authResult) {
					resolve(authResult);
				}
				else resolve(null);
			})
		})
	}

	logout() {
		localStorage.removeItem('id_token');
	}

	getUserInfo = (accessToken) => {
		return new Promise((resolve, reject) => {
			this.auth.client.userInfo(accessToken, (err, profile) => {
				if (err) reject(err);
				resolve(profile);
			});		
		})
	}

	isAuthenticated() {
		return ( new Date().getTime() < localStorage.getItem('expires_at') );
	}

	isAuthorized() {
		if(!localStorage.getItem('profile')) return false;

		return JSON.parse(localStorage.getItem('profile')).app_metadata.authorization.roles.some(role => (
			(role === 'Delegated Admin - Administrator') || (role === 'Delegated Admin - User')
		))
	}

	isHavingAccessToken() {
		return localStorage.getItem('access_token');
	}

}
