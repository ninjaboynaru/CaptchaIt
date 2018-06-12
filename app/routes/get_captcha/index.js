const express = require('express');
const svgCaptcha = require('svg-captcha');
const config = require('config');
const querySchema = require('./schema.js');
const queryValidator = require('../_middleware/queryValidator');

module.exports = function({ httpError, redisClient, path = '/captcha' } = {}) {
	const router = express.Router();
	const validationOptions = { useDefaults: true, coerceTypes: true, removeAdditional: 'all' };
	const validateQuery = queryValidator(httpError, querySchema, validationOptions, 'query');

	function route(req, res, next) {
		const svg = svgCaptcha.create(req.query);
		const sessionId = req.session.id;

		redisClient.set(sessionId, svg.text, 'PX', config.get('cache.expire'), function(err) {
			if (err) {
				return next(httpError.build.internal({ source: 'REDIS' }));
			}

			res.status(201).json({ data: svg.data });
		});
	}


	router.get(path, [validateQuery, route]);
	return router;
};
