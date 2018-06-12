require('dotenv-safe').config();
const express = require('express');
const controller = require('./routes/index.js');
const redisClient = require('./redisClient');

const app = express();
const client = redisClient.createRedisClient();

client.on('error', function(error) {
	throw error;
});
client.on('connect', function() {
	console.log(`Connected to redis at address ${client.address}`); // eslint-disable-line no-console

	app.use(controller({ redisClient: client }));
	app.listen(process.env.PORT, function() {
		console.log(`Server listening on port ${process.env.PORT}`); // eslint-disable-line no-console
	});
});
