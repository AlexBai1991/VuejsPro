<style lang="sass">
	.slide {
		position: relative;
		height: auto;
		overflow: hidden;
		@at-root .slide-items {
			height: auto;
			width: 100000px;
			transition: transform 0.5s ease-out;
			transform: translate3d(0, 0, 0);
			font-size: 0;
			.slide-item {
				display: inline-block;
				font-size: 14px;
				img {
					display: block;
					width: 100%;
				}
			}
		}
		@at-root .slide-navs {
			position: absolute;
			left: 0;
			right: 0;
			bottom: 5px;
			height: 10px;
			font-size: 0;
			text-align: center;
			span {
				display: inline-block;
				font-size: 14px;
				width: 10px; 
				height: 10px;
				border-radius: 10px;
				background: #ccc;
				margin-right: 10px;
				&:last-child {
					margin-right: 0;
				}
				&.active {
					background: #f04848;
				}
			}
		}
	}
</style>

<template>
	<div :style="{width: deviceWidth + 'px'}" class="slide">
		<div :style="{transform: 'translate3d(' + w + 'px, 0, 0)'}" class="slide-items">
			<a v-for="slideitem in slideItems" :href="slideitem.link" :style="{width: deviceWidth + 'px'}" class="slide-item"><img :src="slideitem.image" alt="slide"></a>
		</div>
		<nav class="slide-navs">
			<span v-for="item in slideItems" :class="{active: ($index + 1) === i}"></span>
		</nav>
	</div>
</template>

<script>
	module.exports = {
		props: ['slideItems'],
		data: function () {
			return {
				deviceWidth: 0,
				w: 0,
				i: 0,
				timer: null
			};
		},
		created: function () {
			var width = document.documentElement.clientWidth;
			this.deviceWidth = width;
		},
		ready: function () {
			var _self = this; 
			var width = _self.deviceWidth,
			    slideItems = _self.slideItems;
			function autoPlay () {
				clearTimeout(_self.timer);
				if (_self.i === slideItems.length) {
					_self.i = 0;
				}
				_self.w = -(_self.i++) * width; 
				_self.timer = setTimeout(autoPlay, 3000);
				console.log('打印出来'+_self.i);
			}
			autoPlay();
		},
		destroyed: function () {
			clearTimeout(this.timer);
		}

	};
</script>