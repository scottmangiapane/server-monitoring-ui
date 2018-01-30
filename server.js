const { spawn } = require('child_process');
const express = require('express');
const fs = require('fs');
const https = require('https');
const ip = require('ip');
const os = require('os');
const path = require('path');
const socket = require('socket.io');

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
const key = fs.readFileSync('./sslcert/privkey.pem', 'utf8');
const cert = fs.readFileSync('./sslcert/fullchain.pem', 'utf8');
const credentials = { key: key, cert: cert };
const server = https.createServer(credentials, app);

app.set('view engine', 'pug');
app.set('views', path.join(__dirname, 'views'));
app.use(express.static(path.join(__dirname, 'static')));

app.get('/', (req, res) => {
	res.render('index', { address: ip.address() });
});

server.listen(8443, () => {
	console.log('HTTPS server running on 8443');
});

// setup websockets

let clients = {};
let data = {};
let node;

const io = socket(server);

io.on('connection', (client) => {
	console.log('client ' + client.id + ' has connected');
	client.emit('update', data);
	clients[client.id] = client;
	client.on('diconnect', () => {
		console.log('client ' + client.id + ' has disconnected');
		delete clients[client.id];
	});
});

// collect analytics

setInterval(() => {
	// CPU usage
	const ps = spawn('sh', ['-c', 'ps -A -o pcpu | tail -n+2 | paste -sd+ | bc']);
	ps.stdout.on('data', (value) => {
		node = parseFloat(value) / cpus.length;
	});
	// average load
	const cpus = os.cpus();
	const loadavg = os.loadavg();
	for (const i in loadavg) {
		const value = Math.round(100 * loadavg[i] / cpus.length);
		loadavg[i] = { value: value };
	}
	loadavg[0].text = '1 minute';
	loadavg[1].text = '5 minutes';
	loadavg[2].text = '15 minutes';
	// rebuild data object
	data = { node: node, loadavg: loadavg };
	// send data to clients
	for (const key in clients) {
		clients[key].emit('update', data);
	}
}, 1000);
