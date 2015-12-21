<style lang="sass">
	.nav-menu {
		position: fixed;
		top: 0;
		bottom: 0;
		left: -200px;
		width: 200px;
		background: #fff;
		z-index: 99;
		transition: all .3s ease;
		&.nav-menu-transiton {
			transform: translateX(200px);
		}

		@at-root .nav-menu-wrapper {
		}
	}
</style>

<template>
	<ul class="nav-menu" :class="{'nav-menu-transiton': showMenu}">
		<li class="nav-menu-item"><a v-link="{ path: '/youhui' }">全部</a></li>
		<li class="nav-menu-item"><a v-link="{ path: '/youhui' }">全部</a></li>
		<li class="nav-menu-item"><a v-link="{ path: '/youhui' }">全部</a></li>
		<li class="nav-menu-item"><a v-link="{ path: '/youhui' }">全部</a></li>
		<li class="nav-menu-item"><a v-link="{ path: '/youhui' }">全部</a></li>
	</ul>
</template>

<script>
	module.exports = {
		props: ['showMenu'],
		data: function () {
			return {
			};
		},
		methods: {

		}
	};
</script>