<style lang="sass">
	.navigator {
		display: -webkit-box;
		display: flex;
		flex-flow: row nowrap;
		height: 35px;
		line-height: 35px;
		background-color: #eee; 
		.nav-item {
			flex: 1;
			text-align: center;
		}
		
	}
</style>

<template>
	<nav class="navigator">
		<a v-link="{path: nav.link}" v-for="nav in navItems" class="nav-item">
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