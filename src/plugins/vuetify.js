import '@mdi/font/css/materialdesignicons.css';
// eslint-disable-next-line import/no-unresolved
import 'vuetify/styles';
import { createVuetify } from 'vuetify';
// eslint-disable-next-line import/no-unresolved
import * as components from 'vuetify/components';
// eslint-disable-next-line import/no-unresolved
import * as directives from 'vuetify/directives';
import colors from 'vuetify/lib/util/colors';

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
	}
});

export default vuetify;
