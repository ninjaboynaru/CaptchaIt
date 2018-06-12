require('dotenv-safe').config();
const config = require('config');
const session = require('express-session');

module.exports = session({
	secret: process.env.COOKIE_SECRET,
	resave: false,
	saveUninitialized: true,
	cookie: config.get('cookie')
});
