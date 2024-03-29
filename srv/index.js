import 'dotenv/config';
import express from 'express';
import compression from 'compression';
import helmet from 'helmet';
import expressSession from 'express-session';
import RedisStore from 'connect-redis';
import Redis from 'ioredis';
import config from 'config';
import cacheResponseDirective from 'express-cache-response-directive';
import history from 'connect-history-api-fallback';
import chalk from 'chalk';
import consoleExpressRoutes from 'console-express-routes';

import errorResponse from './lib/error-response.js';
import HttpError from './lib/http-error.js';
import CustomOpenidClient from './lib/custom-openid-client.js';
import createRoutes from './routes/index.js';

const PORT = 3000;
const prod = process.env.NODE_ENV === 'production';

const app = express();

app.set('trust proxy', 1); // Google OAuth2.0ではHTTPSが必須なので、リバースプロキシを経由している場合は、この設定が必要
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

const redis = new Redis(config.get('redis.session'));
const store = new RedisStore({ client: redis });
app.use(
	expressSession({
		...config.get('session'),
		secret: process.env.COOKIE_SECRET,
		store
	})
);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cacheResponseDirective());
app.use((req, res, next) => {
	res.cacheControl('no-store');
	next();
});

const { locals } = app;
locals.errors = { HttpError };
locals.oauthClients = {
	google: await CustomOpenidClient.init({
		...config.get('oauth.google'),
		client_id: process.env.CLIENT_ID_GOOGLE,
		client_secret: process.env.CLIENT_SECRET_GOOGLE
	})
};

const routes = await createRoutes();
Object.keys(routes).forEach((route) => {
	routes[route]({ app });
});

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
