require('dotenv-safe').config();
const redis = require('redis');


function getRedisUrl() {
	let redisUrl;

	if (process.env.NODE_ENV === 'production') {
		redisUrl = process.env.REDIS_PROD_URI;
	}
	else if (process.env.NODE_ENV === 'testing') {
		redisUrl = process.env.REDIS_TEST_URI;
	}
	else {
		redisUrl = process.env.REDIS_DEV_URI;
	}

	return redisUrl;
}

function createRedisClient() {
	return redis.createClient(getRedisUrl());
}

module.exports = { getRedisUrl, createRedisClient };
