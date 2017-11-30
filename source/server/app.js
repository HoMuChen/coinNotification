const path = require('path');
const https = require('https');
const fs = require('fs');
const morgan = require('morgan');
const express = require('express');
const bodyParser = require('body-parser');
const jwt = require('express-jwt');
const jwks = require('jwks-rsa');

const logger = require('./logger');
const config = require('../../config');
const proxyTo = require('./proxyTo');

const app = express();

app.use(bodyParser.json());
app.use(express.static('../../dist'));

app.use(morgan(':method :url :status :response-time ms - :res[content-length]', {
	stream: logger.stream
}));

const jwtCheck = jwt({
    secret: jwks.expressJwtSecret({
        cache: true,
        rateLimit: true,
        jwksRequestsPerMinute: 5,
        jwksUri: `https:\/\/${config.auth0Domain}.auth0.com/.well-known/jwks.json`
    }),
    issuer: `https:\/\/${config.auth0Domain}.auth0.com/`,
    algorithms: ['RS256']
});

//const sslOptions = {
//	cert: fs.readFileSync('./ssl/cert.pem'),
//	key: fs.readFileSync('./ssl/key.pem')
//};

app.use('/alerts',            jwtCheck, proxyTo(config.appServiceHost) )
app.use('/subscriptions',     jwtCheck, proxyTo(config.pushServiceHost) )

app.listen(config.port, () => {
	console.log(`Express App is listen on port ${config.port}`)
});
//https.createServer(sslOptions, app).listen(config.port, () => {
//	console.log(`Express App is listen on port ${config.port}`)
//});
