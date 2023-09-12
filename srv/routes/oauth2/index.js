import { strict as assert } from 'assert';

import oauth2 from './v1/oauth2.js';

const BASE_V1_API_PATH = `/oauth2`;

export default (options = {}) => {
	assert.ok(options.app, 'app must be required');
	const { app } = options;

	app.use(`${BASE_V1_API_PATH}`, oauth2);

	// eslint-disable-next-line no-unused-vars
	app.use((err, req, res, next) => {
		res.status(err.status || 500).error(err);
	});
};
