/* eslint-env node */
require('@rushstack/eslint-patch/modern-module-resolution');

module.exports = {
	root: true,
	extends: [
		'plugin:vue/vue3-essential',
		'eslint:recommended',
		'airbnb-base',
		'@vue/eslint-config-prettier'
	],
	parserOptions: {
		ecmaVersion: 'latest'
	},
	rules: {
		'import/no-extraneous-dependencies': ['error', { devDependencies: true }]
	}
};
