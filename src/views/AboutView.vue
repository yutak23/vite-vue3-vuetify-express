<template>
	<v-container>
		<h1>This is an about page</h1>

		<v-card class="mx-auto" max-width="344">
			<v-card-title>Piniaのテスト（カウンター）</v-card-title>
			<v-card-text> {{ doubleCount }}</v-card-text>
			<v-card-actions>
				<v-spacer />
				<v-btn color="primary" variant="text" @click="increment">
					increment
				</v-btn>
			</v-card-actions>
		</v-card>
	</v-container>
</template>
<script>
import { mapState, mapActions } from 'pinia';
import { useCounterStore } from '@/stores/counter';

export default {
	computed: {
		...mapState(useCounterStore, ['doubleCount'])
	},
	methods: {
		...mapActions(useCounterStore, ['increment'])
	}
};
</script>
