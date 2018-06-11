const path = require('path');
const standardsFolder = 'coding-standards';

module.exports = {
	env: {
		node: true,
		mocha: true
	},
	extends: [
		'eslint-config-airbnb-base',
		path.resolve(__dirname, standardsFolder, '.eslintrc-chox.js')
	],
	overrides: [{
		"files": ["*.test.js"],
		"rules": {
			"no-unused-expressions": 0
		}
	}]
}
