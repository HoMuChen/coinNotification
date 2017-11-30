const config = {
	client_id: env['CLIENT_ID'],
	auth0_domain:	env['AUTH0_DOMAIN'],
	callback_url: env['CALLBACK_URL'],
	push_service_host: '',
	push_server_public_key: env['PUSH_SERVER_PUBLIC_KEY'],
	app_service_host: ''
}

export default config;
