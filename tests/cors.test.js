const request = require('supertest');
const express = require('express');
const cors = require('../app/routes/_middleware/cors.js');

describe('CORS', function() {
	const app = express();
	app.use(cors);
	app.get('*', function(req, res) {
		res.status(200).end();
	});

	describe('Access-Control-Allow-Origin header', function() {
		const origins = [
			'http://imabanana12345.com',
			'http://redandblue:8032'
		];

		for (const origin of origins) {
			it(`Sets correct header for origin: ${origin}`, function(done) {
				request(app)
				.get('/')
				.set('Origin', origin)
				.expect('Access-Control-Allow-Origin', origin)
				.end(done);
			});
		}
	});
});
