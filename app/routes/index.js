const express = require('express');
const session = require('./middleware/session.js');
const cors = require('./middleware/cors');
const ping = require('./middleware/ping');
const getCaptcha = require('./get_captcha/index.js');
const postCaptcha = require('./post_captcha/index.js');

const router = express.Router();

router.use(cors, session);
router.get('/ping', ping);
router.use(getCaptcha());
router.use(postCaptcha());

module.exports = router;
