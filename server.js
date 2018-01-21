const express = require('express');
const ip = require('ip');
const path = require('path');

const app = express();

app.use(express.static(__dirname + '/static'))

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.get('/', (req, res) => {
	res.render('index', {ip: ip.address()});
});

app.listen(8080, () => console.log('Server running on port 8080.'));
