// import main.scss
require('./assets/css/index.scss');

// libs
import Vue from 'vue'; 
import VueRouter from 'vue-router';
import VueResource from 'vue-resource';
import RouterMap from './routers';
import * as filters from './filters';

// use vue-router
Vue.use(VueRouter);
// use vue-resource
Vue.use(VueResource);

// new router
let router =  new VueRouter({
  hashbang: true,       // 默认值true，所有路径将以!#开头
  history: false,       // 是否启用HTML5 history模式
  saveScrollPosition: false,  // 在启用HTML5 history模式下才有用
  transitionOnLoad: true      // 在初次加载时是否对<router-view>处理场景切换效果。默认情况下，组件在初次加载时会直接渲染。
});

// called before router changeing
router.beforeEach(transition => {
  document.documentElement.classList.remove('scroll-hide');
  document.body.classList.remove('scroll-hide');
  if (transition.to.path === '/forbidden') {
    transition.abort();
  } else {
    transition.next();
  }
});

// router-map
RouterMap(router);

// router.go({name: 'ht', params: {haitaoId: 123}});

// filters
Object.keys(filters).forEach(filter => {
  Vue.filter(filter, filters[filter]);
});

let AppVue = Vue.extend({});

// router start app
router.start(AppVue, '#vueapp');