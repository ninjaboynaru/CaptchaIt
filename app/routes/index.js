const express = require('express');
const cors = require('./_middleware/cors');
const ping = require('./_middleware/ping');
const getCaptcha = require('./get_captcha/index.js');
const postCaptcha = require('./post_captcha/index.js');
const errorHandler = require('./errorHandler.js');
const httpError = require('../services/httpError.js');


module.exports = function({ redisClient } = {}) {
	const router = express.Router();

	router.options('*', cors);
	router.use(cors);
	router.get('/ping', ping);
	router.use(getCaptcha({ httpError, redisClient }));
	router.use(postCaptcha({ httpError, redisClient }));
	router.use(errorHandler({ httpError }));

	return router;
};
