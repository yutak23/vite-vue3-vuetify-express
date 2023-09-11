import { createRouter, createWebHistory } from 'vue-router';
import VuetifyView from '@/views/VuetifyView.vue';
import HomeView from '../views/HomeView.vue';

const router = createRouter({
	history: createWebHistory(import.meta.env.BASE_URL),
	routes: [
		{
			path: '/',
			name: 'home',
			component: HomeView,
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

export default router;
