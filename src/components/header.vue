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
		.post-new {
			position: absolute;
			right: 0;
			top: 0;
			width: 38px;
			height: 43px;
			font-size: 18px;
			text-align: center;
			color: #fff;
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
		<span @click="openNavMenu" class="icon-nav">导航</span>
		<h1>{{ appName }}</h1>
		<span class="post-new iconfont">&#xe60f;</span>
	</header>
	<!-- 侧边栏菜单 -->
	<menu-comp :show-menu.sync="showMenu"></menu-comp>
	<!-- 侧边栏菜单 -->
	<!-- 导航菜单 -->
	<nav-comp :nav-items="navItems"
		:page-type="pageType">
	</nav-comp>
	<!-- 导航菜单 -->
</template>

<script>
	module.exports = {
		props: ['appName', 'showMenu', 'navItems', 'pageType'],
		data: function () {
			return {
			};
		},
		methods: {
			openNavMenu: function () {
				document.documentElement.classList.add('scroll-hide');
				document.body.classList.add('scroll-hide');
				// document.querySelector('.youhui-lists').classList.add('scroll-hide');
				this.showMenu = !this.showMenu;
			},
			closeNavMenu: function () {
				document.documentElement.classList.remove('scroll-hide');
				document.body.classList.remove('scroll-hide');
				// document.querySelector('.youhui-lists').classList.remove('scroll-hide');
				this.showMenu = !this.showMenu;
			}
		},
		components: {
			'menuComp': require('./menu.vue'),
			'navComp': require('./nav.vue')
		}
	};
</script>