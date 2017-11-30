const request = require('request');

const proxyTo = (host) => (req, res) => {
	const url = host + req.originalUrl;
	
	console.log(`[${req.method}] ${req.originalUrl} proxy to ${url}`);

	if(req.method == 'GET' || req.method == 'DELETE') {
		req.pipe(request(url)).pipe(res)
	}else if(req.method == 'POST') {
		request.post({url, headers: req.headers, json: true, body: req.body }).pipe(res);
	}
}

module.exports = proxyTo;
