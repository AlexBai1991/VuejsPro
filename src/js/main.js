require('../css/main.scss');

// 全局错误处理
window.onerror = function (err) {
	alert(JSON.stringify(err));
};

var Vue = require('vue');
var VueRouter = require('vue-router');

var moment = require('moment'); // 时间格式化库
// 设置中文格式
moment.locale('zh-cn');

// install 路由
Vue.use(VueRouter);

// 新建router实例
var router =  new VueRouter({
	hashbang: true, 			// 默认值true，所有路径将以!#开头
	history: false,  			// 是否启用HTML5 history模式
	saveScrollPosition: false,  // 在启用HTML5 history模式下才有用
	transitionOnLoad: true	    // 在初次加载时是否对<router-view>处理场景切换效果。默认情况下，组件在初次加载时会直接渲染。
});

// 全局的前置钩子函数，这个函数会在路由切换开始时调用
router.beforeEach(function (transition) {
	document.documentElement.classList.remove('scroll-hide');
	document.body.classList.remove('scroll-hide');
   	if (transition.to.path === '/forbidden') {
	    transition.abort()
	} else {
	    transition.next()
	}
});
// 定义路由规则
router.map({
	'/': {
		component: require('../view/youhui.vue')
	},
	'/youhui': {
		name: 'yh',
		component: require('../view/youhui.vue')
	},
	'/login': {
		name: 'login',
		component: require('../view/login.vue')
	},
	'/haitao': {
		name: 'ht', 	// 具名路径
		component: require('../view/haitao.vue'),
		haitaoTest: '海淘测试', 		// 自定义字段，将会被插入到所匹配的组件中，可通过this.$route.xxx访问到
		// subRoutes: {
		// 	'/': {
		// 		component: {
		// 			template: '<h2>这是海淘嵌套子组件1</h2>'
		// 		}
		// 	},
		// 	'/subhaitao': {
		// 		component: {
		// 			template: '<h2>这是海淘嵌套子组件2</h2>',
		// 			route: {
		// 				data: function (transition) {
		// 					console.log('已获得数据');
		// 				},
		// 				canActivate: function (transition) {
		// 					console.log('1. 能激活');
		// 					console.warn(transition);
		// 					transition.next();
		// 				},
		// 				canDeactivate: function (transition) {
		// 					console.log('2. 能停用');
		// 					console.warn(transition);
		// 					transition.next();
		// 				},
		// 				activate: function (transition) {
		// 					console.log('3. 已激活');
		// 					console.warn(transition);
		// 					transition.next();
		// 				},
		// 				deactivate: function (transition) {
		// 					console.log('4. 已停用');
		// 					console.warn(transition);
		// 					transition.next();
		// 				}

		// 			}
		// 		}
		// 	}
		// }
	},
	'/faxian': {
		name: 'fx',
		component: require('../view/faxian.vue')
	},
	'/yuanchuang': {
		name: 'yc',
		component: require('../view/yuanchuang.vue')

	},
	'/zixun': {
		name: 'zx',
		component: require('../view/zixun.vue')
	},
	'/detail/:detailId': {
		name: 'detail',
		component: require('../view/detail.vue')
	}
});
// 具名路径跳转示例
// router.go({name: 'ht', params: {haitaoId: 123}});
// 定义过滤器
Vue.filter('getTimeStr', function (value, friendly) {
	var time = moment(value);
	if (friendly) {
		return time.fromNow();
	} 
	return time.format('YYYY-MM-DD HH:mm');
});

var AppVue = Vue.extend({});

//现在我们可以启动应用了！
//路由器会创建一个App实例，并且挂载到选择符#app匹配的元素上。
router.start(AppVue, '#vueapp');