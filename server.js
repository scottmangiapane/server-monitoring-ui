const express = require('express');
const fs = require('fs');
const http = require('http');
const https = require('https');
const ip = require('ip');
const os = require('os');
const path = require('path');

// run http server

const redirect = express();

redirect.all('*', (req, res) => {
	return res.redirect("https://" + req.headers.host + req.url);
});

http.createServer(redirect).listen(8080, () => {
	console.log('HTTP server running on 8080');
});

// run https server

const app = express();

app.set('view engine', 'pug');
app.set('views', path.join(__dirname, 'views'));
app.use(express.static(path.join(__dirname, 'static')));

app.get('/', (req, res) => {
	const free = os.freemem();
	const total = os.totalmem();
	const memory = Math.round(100 * (total - free) / total);
	res.render('index', { ip: ip.address(), memory: memory });
});

const privateKey  = fs.readFileSync('./sslcert/privkey.pem', 'utf8');
const certificate = fs.readFileSync('./sslcert/fullchain.pem', 'utf8');
const credentials = { key: privateKey, cert: certificate };

https.createServer(credentials, app).listen(8443, () => {
	console.log('HTTPS server running on 8443');
});
