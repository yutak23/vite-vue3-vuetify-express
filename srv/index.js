import path from 'path';
import { fileURLToPath } from 'url';
import express from 'express';
import snakecaseKeys from 'snakecase-keys';

const filename = fileURLToPath(import.meta.url);
const dirname = path.dirname(filename);

console.log(dirname);
console.log(snakecaseKeys({ fooBar: 'baz' }));

const app = express();

app.get('/hello', (req, res) => {
	res.json({ msg: 'hello' });
});

app.listen(3000);
