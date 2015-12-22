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
		<a v-link="{path: nav.link}" 
			v-for="nav in navItems" 
			:class="{'active-nav': nav.text == pageType}"
			class="nav-item">
			{{ nav.text }}
		</a>
	</nav>
</template>

<script>
	module.exports = {
		props: ['navItems', 'pageType'],
		data: function () {
			return {

			};
		},
	}
</script>