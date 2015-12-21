require('../css/main.scss');

window.onerror = function (err) {
	alert(JSON.stringify(err));
};

var Vue = require('vue');
var VueRouter = require('vue-router');

var moment = require('moment'); // 时间格式化
moment.locale('zh-cn');

// install 路由
Vue.use(VueRouter);

// 新建router
var router =  new VueRouter();

// 定义路由规则
router.map({
	'/': {
		component: require('../view/youhui.vue')
	},
	'/youhui': {
		component: require('../view/youhui.vue')
	},
	'/haitao': {
		component: require('../view/haitao.vue')
	}
});

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