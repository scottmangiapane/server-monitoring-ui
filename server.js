const express = require('express');
const ip = require('ip');
const os = require('os');
const path = require('path');

const app = express();

app.use(express.static(__dirname + '/static'))

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.get('/', (req, res) => {
	const free = os.freemem();
	const total = os.totalmem();
	const memory = Math.round(100 * (total - free) / total);
	res.render('index', {ip: ip.address(), memory: memory});
});

app.listen(8080, () => console.log('Server running on port 8080.'));
