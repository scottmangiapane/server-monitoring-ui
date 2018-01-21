const express = require('express');
const fs = require('fs');
const http = require('http');
const https = require('https');
const ip = require('ip');
const os = require('os');
const path = require('path');

const privateKey  = fs.readFileSync('./sslcert/privkey.pem', 'utf8');
const certificate = fs.readFileSync('./sslcert/fullchain.pem', 'utf8');
const credentials = { key: privateKey, cert: certificate };

const app = express();

app.use(express.static(__dirname + '/static'))

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.get('/', (req, res) => {
	const free = os.freemem();
	const total = os.totalmem();
	const memory = Math.round(100 * (total - free) / total);
	res.render('index', { ip: ip.address(), memory: memory });
});

const httpServer = http.createServer(app);
const httpsServer = https.createServer(credentials, app);

httpServer.listen(8080);
httpsServer.listen(8443);
