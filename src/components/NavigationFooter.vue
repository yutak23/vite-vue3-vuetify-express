<template>
	<v-app-bar color="grey-lighten-2" location="bottom">
		<v-row>
			<v-col class="text-center" cols="12">
				{{ new Date().getFullYear() }} — <strong>Vuetify</strong>
			</v-col>
		</v-row>
	</v-app-bar>
</template>

<script>
export default {
	name: 'NavigationFooter'
};
</script>
