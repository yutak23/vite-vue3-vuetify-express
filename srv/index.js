import express from 'express';
import compression from 'compression';
import helmet from 'helmet';
import history from 'connect-history-api-fallback';
import chalk from 'chalk';
import consoleExpressRoutes from 'console-express-routes';

import errorResponse from './lib/error-response.js';

const PORT = 3000;
const prod = process.env.NODE_ENV === 'production';

const app = express();

if (prod) app.set('trust proxy', 1);
app.use(compression({ level: 1, memLevel: 3 }));
app.use(errorResponse());
app.use(
	helmet({
		contentSecurityPolicy: {
			directives: {
				// for Vue : EvalError: Refused to evaluate a string as JavaScript because 'unsafe-eval' is not an allowed source of script in the following Content Security Policy directive: "script-src 'self'".
				'script-src': ["'self'", "'unsafe-eval'"]
			}
		}
	})
);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

if (prod) {
	app.use(history());
	app.use(express.static('dist'));
}

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
