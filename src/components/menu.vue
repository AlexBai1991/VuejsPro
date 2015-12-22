<style lang="sass">
	.side-menu {
		position: fixed;
		top: 0;
		bottom: 0;
		left: -200px;
		width: 200px;
		background: #fff;
		z-index: 99;
		transition: all .3s ease;
		&.side-menu-transiton {
			transform: translateX(200px);
		}

		@at-root .user-info {
			padding: 15px;
			font-size: 16px;
			@at-root .login-no {
				position: relative;
				height: 25px;
				line-height: 25px;
				padding-left: 35px;
				margin: 10px;
				&:before {
					position: absolute;
					left: 0;
					top: 0;
					width: 25px;
					height: 25px;
					content: '';
					background: url('../img/login_icon.png') no-repeat left center;
					background-size: 25px;
				}
			}
		}
		@at-root .side-menu-items {
			padding-top: 10px;
			margin: 0 25px; 
			border-top: 1px solid #ddd;
			li {
				padding: 15px 0;
				font-size: 15px;
				&.br-top {
					border-top: 1px solid #ddd;
				}
			}
		}
	}
</style>

<template>
	<aside class="side-menu" :class="{'side-menu-transiton': showMenu}">
		<div class="user-info">
			<p class="login-no">
				<a href="">登录</a>
			</p>
		</div>
		<ul class="side-menu-items">
			<li class="icon-quanbu iconfont" v-link="{ path: '/youhui' }">优惠</li>
			<li class="icon-hao iconfont" v-link="{ path: '/haitao' }">海淘</li>
			<li class="icon-wenda iconfont" v-link="{ path: '/faxian' }">发现</li>
			<li class="icon-zhaopin iconfont" v-link="{ path: '/yuanchuang' }">原创</li>
			<li class="icon-hao iconfont" v-link="{ path: '/zixun' }">资讯</li>
			<li class="icon-xiaoxi iconfont br-top" v-link="{ path: '/xiaoxi' }">消息</li>
			<li class="icon-about iconfont" v-link="{ path: '/guanyu' }">关于</li>
		</ul>
	</aside>
</template>

<script>
	require('../css/iconfont/iconfont.css');
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