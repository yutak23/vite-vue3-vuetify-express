import express from 'express';
import compression from 'compression';
import chalk from 'chalk';
import consoleExpressRoutes from 'console-express-routes';

import errorResponse from './lib/error-response.js';

const PORT = 3000;

const app = express();

app.use(compression({ level: 1, memLevel: 3 }));
app.use(errorResponse());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// eslint-disable-next-line no-unused-vars
app.use((err, req, res, next) => {
	res.error(err);
});

app.listen(PORT, () => {
	console.log();
	console.log('  ♻️  Server running at:');
	console.log(`    - Local:   ${chalk.cyan('http://localhost:3000')}`);
	console.log();
	consoleExpressRoutes(app);
});
