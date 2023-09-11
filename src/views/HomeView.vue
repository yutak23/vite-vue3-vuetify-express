<template>
	<v-app>
		<NavigationHeader />
		<v-main class="bg-grey-lighten-5"><router-view /></v-main>
	</v-app>
</template>
<script>
import NavigationHeader from '@/components/NavigationHeader.vue';

export default {
	name: 'HomeView',
	components: { NavigationHeader }
};
</script>
