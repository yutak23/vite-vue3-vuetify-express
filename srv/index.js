import express from 'express';
import chalk from 'chalk';
import consoleExpressRoutes from 'console-express-routes';

const PORT = 3000;

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.listen(PORT, () => {
	console.log();
	console.log('  ♻️  Server running at:');
	console.log(`    - Local:   ${chalk.cyan('http://localhost:3000')}`);
	console.log();
	consoleExpressRoutes(app);
});
