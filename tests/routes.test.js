const chai = require('chai');
const supertest = require('supertest');
const express = require('express');
const redis = require('redis-mock');
const httpError = require('../app/services/httpError.js');
const controller = require('../app/routes/index.js');

chai.use(require('chai-string'));

const expect = chai.expect;
const app = express();
const redisClient = redis.createClient();
app.use(controller({ httpError, redisClient }));
const request = supertest(app);
const captchaPath = '/captcha';

describe('Routes', function() {
	describe('GET Captcha', function() {
		it('Can get a captcha', function(done) {
			request.get(captchaPath).expect(201).end(function(err, res) {
				if (err) {
					throw err;
				}

				expect(res.body).to.have.property('id');
				expect(res.body).to.have.property('data');
				expect(res.body).to.not.have.property('text');

				expect(res.body.data).to.startsWith('<svg');
				expect(res.body.data).to.endsWith('</svg>');
				done();
			});
		});

		it('Can get a captcha with "dev" option', function(done) {
			request.get(`${captchaPath}/?dev=true`).expect(201).end(function(err, res) {
				if (err) {
					throw err;
				}

				expect(res.body).to.have.property('text');
				done();
			});
		});
	});

	describe('POST Captcha', function() {
		let id;
		let text;

		before(function(done) {
			request.get(`${captchaPath}/?dev=true`).end(function(err, res) {
				if (err) {
					throw err;
				}

				expect(res.body).to.have.property('id');
				expect(res.body).to.have.property('text');

				id = res.body.id;
				text = res.body.text;
				done();
			});
		});

		it('Can get "invalid" response for wrong text', function(done) {
			request.post(captchaPath)
			.send({ id, text: 'abcdefghijklmnopqrstuvwxyz1234567890' })
			.expect(200)
			.end(function(err, res) {
				if (err) {
					throw err;
				}

				expect(res.body).to.have.property('valid', false);
				done();
			});
		});

		it('Can get "valid" response for correct text', function(done) {
			request.post(captchaPath)
			.send({ id, text })
			.expect(200)
			.end(function(err, res) {
				if (err) {
					throw err;
				}

				expect(res.body).to.have.property('valid', true);
				done();
			});
		});

		it('Can get "invalid" response for already validated text', function(done) {
			request.post(captchaPath)
			.send({ id, text })
			.expect(200)
			.end(function(err, res) {
				if (err) {
					throw err;
				}

				expect(res.body).to.have.property('valid', false);
				done();
			});
		});

		it('Can get "invalid" response for non existent id', function(done) {
			request.post(captchaPath)
			.send({ id: 'abcdefghijklmnopqrstuvwxyz1234567890', text })
			.expect(200)
			.end(function(err, res) {
				if (err) {
					throw err;
				}

				expect(res.body).to.have.property('valid', false);
				done();
			});
		});

		it('Can get error for no "text" param', function(done) {
			request.post(captchaPath)
			.send({ id })
			.expect(400)
			.end(done);
		});
	});
});
