<style lang="sass">
	.header {
		position: fixed;
		top: 0;
		left: 0;
		z-index: 6;
		width: 100%;
		height: 43px;
		line-height: 43px;
		background: #f04848;
		box-shadow: 0 0 4px rgba(0, 0, 0, 0.25);
		transition: all .3s ease;
		&.header-transition {
			transform: translateX(200px);
		}
		h1 {
			text-align: center;
			font-size: 18px;
			color: #fff;
		}
		.icon-nav {
			position: absolute;
			top: 0;
			left: 0px;
			width: 45px;
			height: 43px;
			text-indent: -9999px;
			background: url('//m.smzdm.com/resources/img/icons.png') no-repeat center;
			background-position: 14px -1211px;
			background-size: 56px;
		}
	}
	.page-cover {
	    position: fixed;
	    top: 0;
	    right: 0;
	    bottom: 0;
	    left: 0;
	    background: rgba(0, 0, 0, 0.4);
	    z-index: 7;
	}
</style>

<template>
	<div v-if="showMenu" @click="closeNavMenu" class="page-cover"></div>
	<header class="header" :class="{'header-transition': showMenu}">
		<h1>{{ appName }}</h1>
		<span @click="openNavMenu" class="icon-nav">导航</span>
	</header>
	<menu-component :show-menu.sync="showMenu"></menu-component>
</template>

<script>
	module.exports = {
		data: function () {
			return {
				showMenu: false
			};
		},
		props: ['appName'],
		methods: {
			openNavMenu: function () {
				// document.documentElement.classList.add('scroll-hide');
				document.body.classList.add('scroll-hide');
				// document.querySelector('.youhui-lists').classList.add('scroll-hide');
				this.showMenu = !this.showMenu;
			},
			closeNavMenu: function () {
				// document.documentElement.classList.remove('scroll-hide');
				document.body.classList.remove('scroll-hide');
				this.showMenu = !this.showMenu;
			}
		},
		components: {
			'menu-component': require('./menu.vue')
		}
	};
</script>