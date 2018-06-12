module.exports = {
	type: 'object',
	properties: {
		size: { type: 'integer', default: 4, maximum: 12, minimum: 1 },
		color: { type: 'boolean', default: true },
		noise: { type: 'integer', default: 1, maximum: 12, minimum: 0 },
		background: { type: 'string', default: '#cc9966' },
		width: { type: 'integer', default: 150 },
		height: { type: 'integer', default: 50 }
	}
};
