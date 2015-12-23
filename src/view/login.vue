<style lang="sass">
	.login {
		margin-top: 50px;
		padding: 20px;
		.login-input {
			padding: 50px 0 10px;
			input {
				font-size: 16px;
				border: none;
				width: 100%;
				padding: 10px 0;
				border-bottom: 1px solid #f04848;
			}
		}
		.login-button {
			margin-top: 10px;
			a {
				display: inline-block;
				width: 48%;
				height: 35px;
				line-height: 35px;
				text-align: center;
				border-radius: 4px;
				box-shadow: 0 2px 3px rgba(0, 0, 0, 0.3);
				&:first-child {
					margin-right: 2%;
					background: #ddd;
					color: #000;
				}
				&:last-child {
					background: #f04848;
					color: #fff;
				}
			}
		}
	}
	.tishi {
		position: fixed;
		top: 0;
		bottom: 0;
		left: 0;
		right: 0;
		.tishi-box {
			width: 80%;
			line-height: 1.8;
			margin: 0 auto;
			color: #fff;
			padding: 18px 25px;
			background: rgba(49, 49, 49, 0.8);
			border-radius: 4px;
			margin-top: 50%;
		}
	}
</style>

<template>
	<nv-head app-name="登录" :no-nav="true" :no-plus="true" :no-top-nav="true"></nv-head>	
	<section class="login">
		<div class="login-input">
			<input type="text" v-model="token" placeholder="Access Token">
		</div>
		<div class="login-button">
			<a href="">注册</a><a @click="goLogin">登录</a>
		</div>
	</section>
	<div v-if="alert.show" class="tishi">
		<div class="tishi-box">{{ alert.txt }}</div>
	</div>
</template>

<script>
	var storage = require('../js/storage.js');
	module.exports = {
		data: function () {
			var _self = this;
			return {
				token: '',
				noToken: true,
				alert: {
                    txt: '',
                    show: false,
                    hideFn: function () {
                        var timer;
                        clearTimeout(timer);
                        timer = setTimeout(function () {
                            _self.alert.show = false;
                        }, 1000);
                    }
                },
			};
		},
		methods: {
			goLogin: function () {
				var _self = this;
				if (!_self.token) {
					_self.alert.txt = '令牌格式错误,应为36位UUID字符串';
					_self.alert.show = true;
					_self.alert.hideFn();
					return;
				}
				storage.fetchData({
					url: 'https://cnodejs.org/api/v1/accesstoken',
					method: 'post',
					data: { accesstoken: _self.token }
				}, function (res) {
					if (res.success) {
						localStorage.loginName = res.loginname;
                        localStorage.avatarUrl = res.avatar_url;
                        localStorage.userId = res.id;
                        localStorage.token = _self.token;	
                        var redirect = decodeURIComponent(_self.$route.query.redirect) || '/';
						_self.$route.router.go(redirect);			
					}
				}, function (err) {
					console.log(err);
				});
				
			}
		},
		components: {
			'nvHead': require('../components/header.vue')
		}
		
	};
</script>