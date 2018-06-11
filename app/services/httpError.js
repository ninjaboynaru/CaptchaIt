const build = {};

build.general = function general({ meta = {},
	error = 'General',
	message = 'An error has occured',
	code = 0,
	status = 400 } = {}) {
	const errorResponse = {
		payload: {
			error,
			message,
			code,
			meta
		},
		internal: {
			status
		}
	};

	return errorResponse;
};

build.query = function query({ message = 'Invalid, malformed, or missing query arguments have been passed', status = 400 } = {}) {
	return build.general({ error: 'Query', message, status });
};

build.internal = function internal({ status = 500, source = 'SERVER' } = {}) {
	const errorResponse = build.general({ error: 'Internal', message: 'An internal error has occured', status });
	errorResponse.internal.source = source;

	return errorResponse;
};

build.notFound = function notFound({ message = 'The requested resource could not be found', status = 404 } = {}) {
	return build.general({ error: 'Not found', message, status });
};

module.exports = { build };
