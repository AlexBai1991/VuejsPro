'use strict';

export default function (router) {
  router.map({
    '/': {
      component: require('./view/youhui.vue')
    },
    '/youhui': {
      name: 'yh', // 具名路径
      component: require('./view/youhui.vue')
    },
    '/login': {
      name: 'login',
      component: require('./view/login.vue')
    },
    '/haitao': {
      name: 'ht',
      component: require('./view/haitao.vue'),
      haitaoTest: '海淘测试'    // 自定义字段，将会被插入到所匹配的组件中，可通过this.$route.xxx访问到
    },
    '/faxian': {
      name: 'fx',
      component: require('./view/faxian.vue')
    },
    '/yuanchuang': {
      name: 'yc',
      component: require('./view/yuanchuang.vue')
    },
    '/zixun': {
      name: 'zx',
      component: require('./view/zixun.vue')
    },
    '/detail/:detailId': {
      name: 'detail',
      component: require('./view/detail.vue')
    }
  });
}