require('dotenv-safe').config();
const express = require('express');
const controller = require('./routes/index.js');

const app = express();
app.use(controller);
app.listen(process.env.PORT, function() {
	console.log(`Server listening on port ${process.env.PORT}`); // eslint-disable-line no-console
});
