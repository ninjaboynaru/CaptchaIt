const express = require('express');
const bodyParser = require('body-parser');

module.exports = function({ path = '/captcha' } = {}) {
	const router = express.Router();

	router.post(path, bodyParser.json(), function(req, res) {
		res.status(200).json({ success: true });
	});
	return router;
};
