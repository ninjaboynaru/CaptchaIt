const Ajv = require('ajv');

module.exports = function(httpError, jsonSchema, schemaOptions, propertyToValidate = 'query') {
	const ajvInstance = new Ajv(schemaOptions);
	const validate = ajvInstance.compile(jsonSchema);

	return function(req, res, next) {
		const isValid = validate(req[propertyToValidate]);

		if (isValid === false) {
			const message = ajvInstance.errorsText(validate.errors);
			const error = httpError.build.query({ message });

			res.status(error.internal.status).json(error.payload);
		}
		else {
			next();
		}
	};
};
