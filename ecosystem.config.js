module.exports = {
	apps: [{
		name: 'CaptchaIt',
		script: './app/index.js',
		instances: 1
	}],
	env: {
		NODE_ENV: 'development'
	},
	env_production: {
		NODE_ENV: 'production'
	}
};
