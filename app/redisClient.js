require('dotenv-safe').config();
const redis = require('redis');


function getRedisUrl() {
	if (process.env.NODE_ENV === 'production') {
		return process.env.REDIS_PROD_URI;
	}
	else if (process.env.NODE_ENV === 'testing') {
		return process.env.REDIS_TEST_URI;
	}

	return process.env.REDIS_DEV_URI;
}

function getRedisPassword() {
	if (process.env.NODE_ENV === 'production') {
		return process.env.REDIS_PROD_PASS;
	}

	return process.env.REDIS_DEV_PASS;
}

function createRedisClient() {
	return redis.createClient(getRedisUrl(), { password: getRedisPassword() });
}

module.exports = { getRedisUrl, createRedisClient };
