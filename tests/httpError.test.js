const chai = require('chai');
const httpError = require('../app/services/httpError.js');

const expect = chai.expect;

describe('HTTP error builder', function() {
	it('Can build query error', function() {
		const message = 'A sample message of sorts';
		const error = httpError.build.query({ message });

		expect(error.payload).to.have.property('message', message);
		expect(error.internal).to.have.property('status', 400);
	});

	it('Can build internal error', function() {
		const source = 'DATABASE';
		const error = httpError.build.internal({ source });

		expect(error.internal).to.have.property('source', source);
		expect(error.internal).to.have.property('status', 500);
	});

	it('Can build "not found" error', function() {
		const message = 'Not found - Deal with it';
		const error = httpError.build.notFound({ message });

		expect(error.payload).to.have.property('message', message);
		expect(error.internal).to.have.property('status', 404);
	});
});
