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
			@at-root .login-success {
				height: 40px;
				@at-root .login-user {
					width: 40px;
					height: 40px;
					border-radius: 40px; 
					vertical-align: middle;
				}
				@at-root .login-name {
					display: inline-block;
					height: 40px;
					line-height: 40px;
					vertical-align: middle;
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
			<p class="login-no" v-if="!loginName" @click="goEnter">
				登录
			</p>
			<div class="login-success" v-if="loginName">
				<img class="login-user" :src="avatarUrl" alt="头像">
				<span class="login-name">{{ loginName }}</span>
			</div>
		</div>
		<ul class="side-menu-items">
			<li class="icon-quanbu iconfont" v-link="{ name: 'yh', query: {tab: 'all'} }">优惠</li>
			<li class="icon-hao iconfont" v-link="{ name: 'yh', query: { tab: 'good' } }">海淘</li>
			<li class="icon-wenda iconfont" v-link="{ name: 'yh', query: { tab: 'share' } }">发现</li>
			<li class="icon-zhaopin iconfont" v-link="{ name: 'yh',query: { tab: 'ask' } }">原创</li>
			<li class="icon-hao iconfont" v-link="{ name: 'yh', query: { tab: 'job' }}">资讯</li>
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
				loginName: localStorage.loginName || '',
				avatarUrl: localStorage.avatarUrl || ''
			};
		},
		methods: {
			goEnter: function () {
				var curPath = encodeURIComponent(this.$route.path);
				this.$route.router.go({ name: 'login', query: { redirect: curPath } });
			}
		}
	};
</script>