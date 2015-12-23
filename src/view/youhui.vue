<style lang="sass">
	.youhui-lists {
		margin: 0 10px;
		overflow-x: hidden; 
	}
	.youhui {
		display: block;
		border-bottom: 1px solid #ddd;
		padding: 10px 0; 
		&:last-child {
			border-bottom: 0 none;
		}
		@at-root .youhui-title {
			font-size: 16px;
			font-weight: bold;
			height: 28px;
			line-height: 28px;
		    white-space: nowrap;
		    text-overflow: ellipsis;
		    overflow: hidden;
		}
		@at-root .youhui-content {
			display: flex;
			.youhui-avatar {
				width: 50px;
				height: 50px;
				border-radius: 50px;
				overflow: hidden;
				margin-right: 20px;
			}
			@at-root .youhui-detail {
				display: flex;
				flex-flow: column wrap;
				justify-content: space-between;
				flex: 1;
				p {
					display: flex;
					justify-content: space-between; 
					&:nth-child(1) {
						margin: 6px 0;
						.reply-num i{
							color: #f04848;
							font-weight: bold;
						}
					}
				}
			}
		}
	}
	.list-item {
		display: flex;
		display: -webkit-box;
		flex-flow: row nowrap;
		-webkit-box-orient: horizontal;
		padding: 10px 0;
		border-bottom: 1px solid #eee;
	}
	.list-item:last-child {
		border-bottom: 0 none;
	}
	.list-item .item-img {
		width: 90px;
		/*height: 60px;*/
		margin-right: 10px;
	}
	.item-img img {
		width: 100%;
		height: auto;

	}
	.list-item .item-desc {
		flex: 1;
		-webkit-box-flex: 1;
	}
	.item-desc .item-title {
		font-size: 16px;
		line-height: 1.5;
	}
	.item-desc .item-detail {
		line-height: 18px;
	}
</style>

<template>
	<!-- 头部导航 -->
    <nav-head :app-name='appName'
    		:nav-items="navItems" 
    		:show-menu.sync="showMenu">
    </nav-head>
    <!-- 头部导航 -->
    <!-- 轮播图 -->
    <slide-comp :slide-items="slideItems">
    </slide-comp>
    <!-- 轮播图 -->
    <!-- 优惠列表 -->
	<section class="youhui-lists">
		<div v-for="item in topics" 
			v-link="{ name: 'detail', params: { detailId: item.id } }" 
			class="youhui">
			<h3 class="youhui-title" title="{{ item.tab }}">{{ item.title }}</h3>
			<div class="youhui-content">
				<img class="youhui-avatar" :src="item.author.avatar_url" alt="头像">
				<div class="youhui-detail">
					<p>
						<span class="avatar-pic">{{ item.author.loginname }}</span>
						<span class="reply-num"><i>{{ item.reply_count }}</i>/{{ item.visit_count }}</span>
					</p>
					<p>
						<span>{{ item.create_at | getTimeStr true}}</span>
						<span>{{ item.last_reply_at | getTimeStr true}}</span>
					</p>
				</div>
			</div>
		</div>		
	</section>
    <!-- 优惠列表 -->
</template>

<script>
	var storage = require('../js/storage.js');
	module.exports = {
		data: function () {
			return {
				appName: 'VueApp',
				navItems: [
					{text: '优惠', name: 'yh', tab: 'all'},
					{text: '海淘', name: 'yh', tab: 'good'}, 
					{text: '发现', name: 'yh', tab: 'share'}, 
					{text: '原创', name: 'yh', tab: 'ask'}, 
					{text: '资讯', name: 'yh', tab: 'job'}
				],
				slideItems: [
					{ image: '//eimg.smzdm.com/201512/18/5673e592470586446.png', link: '//alexbai.github.io'},
					{ image: '//eimg.smzdm.com/201512/18/5673e56bc72ad7183.jpg', link: ''},
					{ image: '//eimg.smzdm.com/201512/18/567367923ebdd7381.png', link: ''},
					{ image: '//eimg.smzdm.com/201512/18/5673e6540b1894931.png', link: ''},
					{ image: '//eimg.smzdm.com/201512/18/5673e592470586446.png', link: '//alexbai.github.io'},
				],
				topics: [],
				searchKey: {
					page: 1,
					limit: 20,
					tab: 'all',
					mdrender: true
				},
				canScroll: true,
				showMenu: false
			};
		},
		route: {
			data: function (transition) {
				var _self = this, tab = transition.to.query.tab || 'all';

				_self.showMenu = false;
				_self.searchKey.page = 1;
				_self.searchKey.tab = tab;
				_self.getTopics();

				// 滚动加载更多
				document.addEventListener('scroll', _self.getMoreTopics);
			},
			deactivate: function (transition) {
				var _self = this;
				document.removeEventListener('scroll', _self.getMoreTopics);
                transition.next();
			}
		},
		computed: {
			clientHeight: function () {
				return document.documentElement.clientHeight;
			},
			wScrollObj: function () {
				return document.body;
			}
		},
		methods: {
			getParams: function (obj) {
				if (!obj || typeof obj !== 'object') { return; }
				var res = [];
				for (var key in obj) {
					res.push(key + '=' + obj[key]);
				}
				return res.join('&');
			},
			getTopics: function () {
				var _self = this; 
				var params = _self.getParams(_self.searchKey);
				storage.fetchData('https://cnodejs.org/api/v1/topics?' + params, function (d) {
					_self.canScroll = true;
					var topics = d && d.data;
					if (topics.length) {
						if (_self.searchKey.page === 1) {
							_self.topics = d.data;
						} else {
							_self.topics = _self.topics.concat(d.data);
						}
					}
				});
			},
			getMoreTopics: function (event) {
				var _self = this;
				if (_self.canScroll) {
					var cHeight = _self.clientHeight, wsHeight = _self.wScrollObj.scrollHeight, wsTop = _self.wScrollObj.scrollTop;

					if (cHeight + wsTop > wsHeight - 100) {
						_self.canScroll = false;
						_self.searchKey.page++;
						_self.getTopics();
					}
				}
			}
		},
		components: {
			'navHead': require('../components/header.vue'),
			'slideComp': require('../components/slide.vue')
		}
	};
</script>