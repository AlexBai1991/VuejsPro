<style lang="sass"></style>

<template>
	<nv-head :app-name="appName"
		:nav-items="navItems"></nv-head>		
</template>

<script>
	module.exports = {
		data: function () {
			return {
				appName: 'VueApp',
				navItems: [
					{text: '优惠', name: 'yh'},
					{text: '海淘', name: 'ht'}, 
					{text: '发现', name: 'fx'}, 
					{text: '原创', name: 'yc'}, 
					{text: '资讯', name: 'zx'}
				],
			};
		},
		components: {
			nvHead: require('../components/header.vue')
		}
	};
</script>