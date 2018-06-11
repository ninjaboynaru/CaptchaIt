const express = require('express');
const session = require('./_middleware/session.js');
const cors = require('./_middleware/cors');
const ping = require('./_middleware/ping');
const getCaptcha = require('./get_captcha/index.js');
const postCaptcha = require('./post_captcha/index.js');

const router = express.Router();

router.use(cors, session);
router.get('/ping', ping);
router.use(getCaptcha());
router.use(postCaptcha());

module.exports = router;
