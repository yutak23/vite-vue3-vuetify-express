import { fileURLToPath, URL } from 'url';

import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import vuetify, { transformAssetUrls } from 'vite-plugin-vuetify';

// https://vitejs.dev/config/
export default defineConfig({
	plugins: [
		vue({ template: { transformAssetUrls } }),
		vuetify({
			autoImport: true,
			styles: { configFile: 'src/styles/settings.scss' }
		})
	],
	resolve: {
		alias: {
			'@': fileURLToPath(new URL('./src', import.meta.url))
		}
	},
	server: { host: '0.0.0.0', port: 8080 }
});
