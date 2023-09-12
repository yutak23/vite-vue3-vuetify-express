import { strict as assert } from 'assert';
import camelcaseKeys from 'camelcase-keys';
import { Issuer, generators } from 'openid-client';

export default class CustomOpenidClient {
	constructor(options = {}) {
		assert.ok(options.issure, 'options.issure must be required.');
		assert.ok(options.client, 'options.client must be required.');
		assert.ok(options.scopes, 'options.scopes must be required.');

		this.issure = options.issure;
		this.client = options.client;
		this.scopes = options.scopes;
		this.accessType = options.accessType || null;
	}

	static async init(options = {}) {
		assert.ok(Array.isArray(options.scopes), 'options.scopes must be array.');

		const camelcasedOptions = camelcaseKeys(options, { deep: true });
		const needProps = ['issure', 'clientId', 'clientSecret', 'redirectUri', 'scopes', 'accessType'];
		needProps.forEach((key) => {
			assert.ok(camelcasedOptions[key], `camelcasedOptions must contain key:${key}`);
		});

		const issure = await Issuer.discover(camelcasedOptions.issure);
		const client = new issure.Client({
			client_id: camelcasedOptions.clientId,
			client_secret: camelcasedOptions.clientSecret,
			redirect_uris: [camelcasedOptions.redirectUri],
			response_types: ['code']
		});
		return new CustomOpenidClient({
			issure,
			client,
			scopes: camelcasedOptions.scopes.join(' '),
			accessType: camelcasedOptions.accessType
		});
	}

	start() {
		const state = generators.state();
		const codeVerifier = generators.codeVerifier();
		const codeChallenge = generators.codeChallenge(codeVerifier);

		const params = {
			scope: this.scopes,
			state,
			code_challenge: codeChallenge,
			code_challenge_method: 'S256',
			prompt: 'consent' // https://github.com/googleapis/google-api-python-client/issues/213
		};
		if (this.accessType) params.access_type = this.accessType;

		const authUrl = this.client.authorizationUrl(params);
		return { authUrl, state, codeVerifier };
	}

	async callback(options = {}) {
		assert.ok(options.state, 'options.state must be required.');
		assert.ok(options.codeVerifier, 'options.codeVerifier must be required.');
		assert.ok(options.req, 'options.req must be required.');

		const { req, state, codeVerifier } = options;

		const params = this.client.callbackParams(req);
		const tokenSet = await this.client.callback(this.client.redirect_uris[0], params, {
			response_type: 'code',
			state,
			code_verifier: codeVerifier
		});
		return camelcaseKeys({ ...tokenSet, claims: tokenSet.claims() });
	}
}
