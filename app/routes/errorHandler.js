const express = require('express');
const circularJson = require('circular-json');

module.exports = function({ httpError } = {}) {
	const router = express.Router();

	function handleHttpError(err, req, res, next) {
		if (!err.payload) {
			return next(err);
		}

		if (process.env.NODE_ENV !== 'production') {
			err.payload.meta.request = JSON.parse(circularJson.stringify(req));
		}

		res.status(err.internal.status).json(err.payload);
	}

	function handleBodyParserError(err, req, res, next) {
		if (!err.status || !err.body || !err.type) {
			return next(err);
		}

		const message = err.expose ? err.message : undefined;
		const errorObject = httpError.build.query({ message, status: err.status });
		errorObject.payload.body = err.body;

		if (process.env.NODE_ENV !== 'production') {
			errorObject.payload.meta.request = JSON.parse(circularJson.stringify(req));
		}

		res.status(errorObject.internal.status).send(errorObject.payload);
	}

	// eslint-disable-next-line no-unused-vars
	function handleOtherError(err, req, res, next) {
		const errorObject = httpError.build.internal({ source: 'UNKNOWN' });
		if (process.env.NODE_ENV !== 'production') {
			errorObject.payload.meta.request = JSON.parse(circularJson.stringify(req));
			errorObject.payload.meta.errorObject = JSON.parse(circularJson.stringify(err));
		}

		res.status(errorObject.internal.status).json(errorObject.payload);
	}

	router.use(handleHttpError, handleBodyParserError, handleOtherError);
	return router;
};
