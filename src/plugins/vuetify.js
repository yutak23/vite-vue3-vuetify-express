/* eslint-disable import/no-unresolved */
import '@mdi/font/css/materialdesignicons.css';
import 'vuetify/styles';
import { createVuetify } from 'vuetify';
import * as components from 'vuetify/components';
import * as directives from 'vuetify/directives';
import colors from 'vuetify/lib/util/colors';
import { createVueI18nAdapter } from 'vuetify/locale/adapters/vue-i18n';
import { useI18n } from 'vue-i18n';
import i18n from '@/plugins/i18n';

const vuetify = createVuetify({
	components,
	directives,
	theme: {
		themes: {
			light: {
				dark: false,
				colors: {
					secondary: colors.grey.darken1
				}
			}
		}
	},
	locale: {
		adapter: createVueI18nAdapter({ i18n, useI18n })
	}
});

export default vuetify;
