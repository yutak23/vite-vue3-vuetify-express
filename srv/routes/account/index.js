import { strict as assert } from 'assert';

import account from './v1/account.js';

const BASE_V1_API_PATH = `/api/v1/account`;

export default (options = {}) => {
	assert.ok(options.app, 'app must be required');
	const { app } = options;

	app.use(`${BASE_V1_API_PATH}`, account);

	// eslint-disable-next-line no-unused-vars
	app.use((err, req, res, next) => {
		res.status(err.status || 500).error(err);
	});
};
