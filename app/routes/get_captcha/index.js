const express = require('express');

module.exports = function({ path = '/captcha' } = {}) {
	const router = express.Router();

	router.get(path, function(req, res) {
		res.status(200).json({ success: true });
	});
	return router;
};
