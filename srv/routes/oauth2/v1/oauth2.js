import express from 'express';
import { DateTime } from 'luxon';

const router = express.Router();

router.get('/start', async (req, res) => {
	const {
		session,
		app: {
			locals: { oauthClients }
		},
		query: { url }
	} = req;

	if (session.email && session.refreshToken) res.redirect(`/`);

	const { authUrl, state, codeVerifier } = oauthClients.google.start();
	if (url && url.startsWith('/') && !url.startsWith('/oauth2/start')) session.redirectUrl = url;
	session.state = state;
	session.codeVerifier = codeVerifier;
	await new Promise((resolve, reject) => {
		session.save((err) => {
			if (err) reject(err);
			resolve('');
		});
	});

	return res.redirect(authUrl);
});

router.get('/callback', async (req, res) => {
	const { session } = req;
	const {
		errors: { HttpError },
		oauthClients
	} = req.app.locals;

	try {
		if (session.state !== req.query.state) throw new HttpError(400, 'Invalid state.');

		const data = await oauthClients.google.callback({
			req,
			state: session.state,
			codeVerifier: session.codeVerifier
		});

		console.log(data);

		const regenerate = (oldSession) => {
			return new Promise((resolve, reject) => {
				oldSession.regenerate((err) => {
					if (err) throw reject(err);
					const { session: newSession } = req;
					newSession.accessToken = data.accessToken;
					newSession.expiresAt = data.expiresAt;
					newSession.accessTokenExpire = DateTime.now()
						.plus({ seconds: data.expiresAt - 10 })
						.toUnixInteger();
					newSession.refreshToken = data.refreshToken;

					newSession.email = data.claims.email;
					newSession.locale = data.claims.locale;
					newSession.save();

					console.log(newSession);

					resolve(newSession);
				});
			});
		};
		await regenerate(session);

		return res.redirect(`${session.redirectUrl || '/'}`);
	} catch (e) {
		return res.status(500).error(e);
	}
});

export default router;
