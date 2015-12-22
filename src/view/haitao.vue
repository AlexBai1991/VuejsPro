<style lang="sass">
	
</style>

<template>
	<nav-head :app-name="appName" 
		:show-menu.sync="showMenu"
		:page-type="pageType"
		:nav-items="navItems">
	</nav-head>
	<div class="haitao-lists">
		<button @click="openTimer">
		TIMER
		</button>
		<a v-for="item in haitaoItems" class="list-item" href="javascript:;">
			<div class="item-img">
				<img :src="item.img" alt="图片">
			</div>
			<section class="item-desc">
				<p class="item-title">{{ item.title }}</p>
				<div class="item-detail">{{ item.detail }}</div>
			</section>
		</a>
	</div>
</template>

<script>
	module.exports = {
		props: ['haitaoItems'],
		data: function () {
			return {
				appName: 'VueApp',
				pageType: '海淘',
				navItems: [
					{text: '优惠', link: '/youhui'},
					{text: '海淘', link: '/haitao'}, 
					{text: '发现', link: '/faxian'}, 
					{text: '原创', link: '/yuanchuang'}, 
					{text: '资讯', link: '/zixun'}
				],
				showMenu: false,
				timer: null
			};
		},
		created: function () {
			// console.log(this.showMenu);
		},
		methods: {
			openTimer: function () {
				var i = 0, _self = this;
				// clearTimeout(_self.timer);
				function play () {
					if (_self.timer) { clearTimeout(_self.timer); }
					console.log(i++);
					_self.timer = setTimeout(play, 1000);
				}
				play();
				// _self.timer = setTimeout(function () { console.log(1111); }, 3000);
			}
		},
		components: {
			'navHead': require('../components/header.vue'),
		}
	};
</script>