<template>
	<v-app>
		<!-- https://vuetifyjs.com/en/features/application-layout/#placing-components に記載がある通り、実装順にレイヤーができる -->
		<NavigationFooter />
		<NavigationHeader />
		<v-main class="bg-grey-lighten-5"><router-view /></v-main>
	</v-app>
</template>
<script>
import NavigationHeader from '@/components/NavigationHeader.vue';
import NavigationFooter from '@/components/NavigationFooter.vue';

export default {
	name: 'HomeView',
	components: { NavigationHeader, NavigationFooter }
};
</script>
