import express from 'express';

const router = express.Router();

router.get('/token', async (req, res) => {
	const { session } = req;
	const {
		errors: { HttpError }
	} = req.app.locals;

	console.log(session);
	try {
		if (!session || !session.email || !session.refreshToken)
			throw new HttpError(404, 'Session does not exists.');
		return res.status(200).json({ token: session.id });
	} catch (e) {
		return res.status(500).error(e);
	}
});

export default router;
