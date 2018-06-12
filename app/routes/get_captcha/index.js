const express = require('express');
const uniqid = require('uniqid');
const svgCaptcha = require('svg-captcha');
const config = require('config');
const querySchema = require('./schema.js');
const queryValidator = require('../_middleware/queryValidator');

module.exports = function({ httpError, redisClient, path = '/captcha' } = {}) {
	const router = express.Router();
	const validationOptions = { useDefaults: true, coerceTypes: true, removeAdditional: 'all' };
	const validateQuery = queryValidator(httpError, querySchema, validationOptions, 'query');

	function route(req, res, next) {
		const id = uniqid.time(`CAPTCHA-${Math.random() * 10}-`);
		const svg = svgCaptcha.create(req.query);
		const expire = config.get('cache.expire');

		redisClient.set(id, svg.text, 'PX', expire, function(err) {
			if (err) {
				return next(httpError.build.internal({ source: 'REDIS' }));
			}

			const response = { id, expire, data: svg.data };
			if (process.env.NODE_NEV !== 'production' && req.query.dev === true) {
				response.text = svg.text;
			}

			res.status(200).json(response);
		});
	}


	router.get(path, [validateQuery, route]);
	return router;
};
