import { defineStore } from 'pinia';

// eslint-disable-next-line import/prefer-default-export
export const useCounterStore = defineStore({
	id: 'counter',
	state: () => ({
		count: 0
	}),
	getters: {
		doubleCount: (state) => state.count * 2
	},
	actions: {
		increment() {
			this.count += 1;
		}
	}
});
