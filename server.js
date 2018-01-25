const express = require('express');
const fs = require('fs');
const https = require('https');
const ip = require('ip');
const os = require('os');
const path = require('path');

// run http server

const redirect = express();

redirect.all('*', (req, res) => {
	return res.redirect("https://" + req.headers.host + req.url);
});

redirect.listen(8080, () => {
	console.log('HTTP server running on 8080');
});

// run https server

const app = express();
const privateKey  = fs.readFileSync('./sslcert/privkey.pem', 'utf8');
const certificate = fs.readFileSync('./sslcert/fullchain.pem', 'utf8');
const credentials = { key: privateKey, cert: certificate };
const server = https.createServer(credentials, app);

app.use(express.static(path.join(__dirname, 'static')));

server.listen(8443, () => {
	console.log('HTTPS server running on 8443');
});

// setup websockets

let clients = {};
let data = {};

const io = require('socket.io')(server);

io.on('connection', (client) => {
	console.log('client ' + client.id + ' has connected');
	client.emit('update', data);
	clients[client.id] = client;
	client.on('diconnect', () => {
		console.log('client ' + client.id + ' has disconnected');
		delete clients[client.id];
	});
});

getData = () => {
	// ip
	const address = ip.address();
	// memory
	const free = os.freemem();
	const total = os.totalmem();
	const memory = Math.round(100 * (total - free) / total);
	// loadavg
	const cpus = os.cpus();
	const loadavg = os.loadavg();
	for (let i in loadavg) {
		const value = Math.round(100 * loadavg[i] / cpus.length);
		loadavg[i] = { value: value };
	}
	loadavg[0].text = '1 minute';
	loadavg[1].text = '5 minutes';
	loadavg[2].text = '15 minutes';
	return { address: address, loadavg: loadavg, memory: memory };
};

setInterval(() => {
	data = getData();
	// send data to clients
	for (const key in clients) {
		clients[key].emit('update', data);
	}
}, 5000);
