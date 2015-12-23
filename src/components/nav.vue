<style lang="sass">
	.navigator {
		margin-top: 43px; 
		display: -webkit-box;
		display: flex;
		flex-flow: row nowrap;
		height: 35px;
		line-height: 35px;
		background-color: #eee; 
		.nav-item {
			flex: 1;
			text-align: center;
			&.active-nav {
				color: #f04848;
				border-bottom: 2px solid #f04848;
			}
		}
		
	}
</style>

<template>
	<nav class="navigator">
		<a v-link="{ name: nav.name, query: { tab: nav.tab }, activeClass: 'active-nav' }" 
			v-for="nav in navItems" 
			class="nav-item">
			{{ nav.text }}
		</a>
	</nav>
</template>

<script>
	module.exports = {
		props: ['navItems'],
		data: function () {
			return {

			};
		},
	}
</script>