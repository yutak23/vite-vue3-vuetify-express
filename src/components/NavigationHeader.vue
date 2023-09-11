<template>
	<v-app-bar>
		<v-app-bar-nav-icon variant="text" @click.stop="drawer = !drawer" />

		<v-app-bar-title class="header-title">
			{{ $t('app.title') }}
		</v-app-bar-title>

		<v-menu location="bottom start">
			<template v-slot:activator="{ props }">
				<v-btn variant="text" icon="mdi-earth" v-bind="props" />
			</template>

			<v-list>
				<v-list-item
					v-for="(language, i) in languages"
					:key="i"
					:value="language.locale"
					@click="changeLocale(language.locale)"
				>
					<v-list-item-title>{{ language.text }}</v-list-item-title>
				</v-list-item>
			</v-list>
		</v-menu>

		<v-btn
			@click.stop="drawer = true"
			variant="text"
			icon="mdi-dots-vertical"
		/>
	</v-app-bar>

	<v-navigation-drawer v-model="drawer" color="white">
		<v-list>
			<v-list-item
				v-for="(menu, i) in menus"
				:key="i"
				:value="menu.to"
				:to="menu.to"
				exact
				active-color="primary"
			>
				<template v-slot:prepend>
					<v-icon :icon="menu.icon" />
				</template>

				<v-tooltip :text="$t(menu.tooltip)" location="bottom">
					<template v-slot:activator="{ props }">
						<v-list-item-title v-bind="props">
							{{ $t(menu.text) }}
						</v-list-item-title>
					</template>
				</v-tooltip>
			</v-list-item>
		</v-list>
	</v-navigation-drawer>
</template>

<script>
export default {
	name: 'NavigationHeader',
	data: () => ({
		drawer: false,
		languages: [
			{ locale: 'ja', text: '日本語' },
			{ locale: 'en', text: 'English' }
		],
		menus: [
			{
				text: 'navigation.header.home.text',
				tooltip: 'navigation.header.home.tooltip',
				icon: 'mdi-home',
				to: '/'
			},
			{
				text: 'navigation.header.about.text',
				tooltip: 'navigation.header.about.tooltip',
				icon: 'mdi-information',
				to: '/about'
			},
			{
				text: 'navigation.header.contact.text',
				tooltip: 'navigation.header.contact.tooltip',
				icon: 'mdi-email',
				to: '/contact'
			}
		]
	}),
	methods: {
		changeLocale(locale) {
			this.$i18n.locale = locale;
			this.$vuetify.locale.current = locale;
		}
	}
};
</script>

<style scoped lang="sass">
.header-title
	color: red
</style>
