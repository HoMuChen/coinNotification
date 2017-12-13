const config = {
	client_id: myEnv['CLIENT_ID'],
	auth0_domain:	myEnv['AUTH0_DOMAIN'],
	callback_url: myEnv['CALLBACK_URL'],
	push_service_host: '',
	push_server_public_key: myEnv['PUSH_SERVER_PUBLIC_KEY'],
	app_service_host: ''
}

export default config;
