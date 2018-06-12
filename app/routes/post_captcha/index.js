const express = require('express');
const bodyParser = require('body-parser');
const querySchema = require('./schema.js');
const queryValidator = require('../_middleware/queryValidator.js');

module.exports = function({ httpError, redisClient, path = '/captcha' } = {}) {
	const router = express.Router();
	const validationOptions = { coerceTypes: true, removeAdditional: 'all' };

	const jsonParser = bodyParser.json();
	const validateQuery = queryValidator(httpError, querySchema, validationOptions, 'body');

	function route(req, res, next) {
		const id = req.body.id;

		redisClient.get(id, function(err, reply) {
			if (err) {
				return next(httpError.build.internal({ source: 'REDIS' }));
			}

			if (reply === req.body.text) {
				res.status(200).json({ valid: true });
				redisClient.del(id);
			}
			else {
				res.status(200).json({ valid: false });
			}
		});
	}

	router.post(path, [jsonParser, validateQuery, route]);
	return router;
};
