<style lang="sass">
	.detail {
		padding: 10px 10px 0;
		.detail-title {
			font-size: 18px;
			font-weight: bold;
			line-height: 1.5;
		}	
		.author-time {
			padding-top: 10px;
			display: flex;
			.author-img {
				width: 50px;
				height: 50px;
				border-radius: 50px;
				margin-right: 15px;
			}
			.author-info-reply {
				flex: 1;
				display: flex;
				flex-flow: row nowrap;
				justify-content: space-between;
				.author-info {
					p {
						line-height: 25px;
					}
				}
				.reply-info {
					flex: 1;
					position: relative;
					span {
						position: absolute;
						right: 0;
						&:nth-child(1) {
							top: 0;
							color: #fff;
							border-radius: 4px;
							padding: 4px 8px;
							background: #f04848;
						}
						&:nth-child(2) {
							bottom: 0;

						}
					}
					.span:nth-child(1) {

					}
				}

			}
		}	
		@at-root .reply-lists {
			padding-bottom: 10px;
			.reply-nums {
				height: 24px;
				line-height: 24px;
				font-size: 16px;				
				border-bottom: 1px solid #d4d4d4;
				span {
					height: 24px;
					display: inline-block;
					border-bottom: 1px solid red;
				}
			}
			@at-root .reply-item {
				border-bottom: 1px solid #d4d4d4;
				padding: 10px 0;
				display: flex;
				img {
				    width: auto;
				    height: auto;
				    max-width: 100%;
				    vertical-align: middle;
				    border: 0;
				}
				.author-avatar {
					width: 50px;
					height: 50px;
					border-radius: 50px;
					margin-right: 15px;
				}
				@at-root .reply-detail {
					flex: 1;
					.reply-author {
						display: flex;
						@at-root .reply-author-info {
							flex: 1;
							p {
								height: 25px;
								line-height: 25px;
							}
						}
						@at-root .reply-button {
							width: 80px;
							text-align: right;
							.icon {
								font-size: 24px;
								&:last-child {
									margin-left: 10px;
								}
							}
						}
					}
				}
				
				.reply-content {
					margin-top: 10px;
					line-height: 1.5;
				}
			}
		}
	}
	.detail-content {
		padding-bottom: 10px;
		margin-top: 20px;
		background: #fff;
	}
	.loading {
		padding-top: 100px;
		height: 100%;
		text-align: center;
	}
</style>

<template>
	<nv-head :app-name="appName"
		:nav-items="navItems"></nv-head>
	<div class="loading" v-if="!detail.title">加载中...</div>
	<section class="detail" v-if="detail.title">
		<h1 class="detail-title">{{ detail.title }}</h1>
		<div class="author-time">
			<img class="author-img" :src="detail.author.avatar_url" alt="头像">
			<div class="author-info-reply">
				<div class="author-info">
					<p v-text="detail.author.loginname"></p>
					<p>发布于：{{ detail.create_at | getTimeStr true }}</p>
				</div>
				<div class="reply-info">
					<span>置顶</span>
					<span>{{ detail.visit_count }}次浏览</span>
				</div>
			</div>
		</div>
		<div class="markdown-body detail-content" 
			v-html="detail.content"></div>		
		<div class="reply-lists">
			<p class="reply-nums">
				<span>评论</span> {{ detail.replies.length }}
			</p>
			<div class="reply-item" 
				v-for="reply in detail.replies">
				<img class="author-avatar" :src="reply.author.avatar_url" alt="头像">
				<div class="reply-detail">
					<div class="reply-author">
						<div class="reply-author-info">
							<p>{{ reply.author.loginname }}</p>
							<p>回复于{{ reply.create_at |getTimeStr true }}</p>
						</div>
						<div class="reply-button">
							<span class="iconfont icon">&#xe608;</span>
							{{ reply.ups.length }}
							<span class="iconfont icon">&#xe609;</span>
						</div>
					</div>
					<p class="reply-content"
						v-html="reply.content"></p>
				</div>
			</div>
		</div>
	</section>
</template>

<script>
	var storage = require('../js/storage.js');
	require('../css/github-markdown.css');
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
				detailId: '',
				detail: {},
			};
		},
		route: {
			data: function (transition) {
				var _self = this;
				console.log(transition);
				_self.detailId = transition.to.params.detailId;
				storage.fetchData('https://cnodejs.org/api/v1/topic/' + _self.detailId, function (d) {
					_self.detail = d.data;
				}, function (err) {
					console.log(err);
				});

			},
			activate: function (transition) {
				console.log(this.$loadingRouteData);
				transition.next();
			}
		},
		components: {
			nvHead: require('../components/header.vue')
		}
	};
</script>