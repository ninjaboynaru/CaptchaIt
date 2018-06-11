const cors = require('cors');

module.exports = cors({
	credentials: true,
	origin: function(error, callback) {
		callback(null, true);
	}
});
