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

app.use('/company',                 proxyTo(config.appServiceHost) )
app.use('/coin_price/:coin',        proxyTo(config.appServiceHost) )
app.use('/taiex/:limit',            proxyTo(config.appServiceHost) )
app.use('/legal_foundation/:type',  proxyTo(config.appServiceHost) )
app.use('/alerts',                  jwtCheck, proxyTo(config.appServiceHost) )
app.use('/subscriptions',           jwtCheck, proxyTo(config.pushServiceHost) )
app.use('/stock_price',             jwtCheck, proxyTo(config.appServiceHost) )
app.use('/dispersion',              jwtCheck, proxyTo(config.appServiceHost) )
app.use('/stockReport',             jwtCheck, proxyTo(config.appServiceHost) )

app.use('/', function (req, res) {
  res.sendFile(path.join(__dirname, '../../dist', '/index.html'))
})

app.listen(config.port, () => {
	console.log(`Express App is listen on port ${config.port}`)
});
//https.createServer(sslOptions, app).listen(config.port, () => {
//	console.log(`Express App is listen on port ${config.port}`)
//});
