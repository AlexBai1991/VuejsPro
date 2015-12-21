<style lang="sass">
	
</style>

<template>
	<header-component :app-name="appName"></header-component>
	<nav-component :nav-items="navItems"></nav-component>
	<div class="haitao-lists">
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
				navItems: [
					{text: '优惠', link: '/youhui'},
					{text: '海淘', link: '/haitao'}, 
					{text: '发现', link: '/faxian'}, 
					{text: '原创', link: '/yuanchuang'}, 
					{text: '资讯', link: '/zixun'}
				],
			};
		},
		components: {
			'header-component': require('../components/header.vue'),
			'nav-component': require('../components/nav.vue')
		}
	};
</script>