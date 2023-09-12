import { createRouter, createWebHistory } from 'vue-router';
import axios from 'axios';
import qs from 'qs';

import VuetifyView from '@/views/VuetifyView.vue';
import HomeView from '../views/HomeView.vue';

const router = createRouter({
	history: createWebHistory(import.meta.env.BASE_URL),
	routes: [
		{
			path: '/login',
			redirect: (to) => {
				const { url } = to.query;
				window.location.href = url ? `/oauth2/start/?${qs.stringify({ url })}` : `/oauth2/start/`;
			}
		},
		{
			path: '/',
			name: 'home',
			component: HomeView,
			meta: { requiresAuth: true },
			children: [
				{
					path: '/',
					name: 'vuetify',
					component: VuetifyView
				},
				{
					path: '/about',
					name: 'about',
					component: () => import('../views/AboutView.vue')
				},
				{
					path: '/contact',
					name: 'contact',
					component: () => import('@/views/ContactView.vue')
				}
			]
		}
	]
});

// eslint-disable-next-line no-unused-vars
router.beforeEach(async (to, from) => {
	if (to.meta.requiresAuth) {
		try {
			const {
				data: { token: accountToken }
			} = await axios.get('/api/v1/account/token');
			console.log(accountToken);
		} catch (e) {
			return { path: '/login', query: { url: to.path } };
		}
	}

	return true;
});

export default router;
