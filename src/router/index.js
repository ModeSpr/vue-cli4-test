import Vue from 'vue'
import VueRouter from 'vue-router'
import { Message } from 'element-ui'
import { getToken } from '@/utils/auth'

import Home from '../views/Home.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home,
    meta: {
      requireAuth: true // 配置此条，进入页面前判断是否需要登陆
    }
  },
  {
    path: '/login',
    name: 'About',
    component: () => import(/* webpackChunkName: "about" */ '../views/About.vue')
  },
  {
    path: '/select',
    name: 'select',
    component: () => import(/* webpackChunkName: "select" */ '../views/select')
  },
  {
    path: '/list',
    name: 'list',
    component: () => import(/* webpackChunkName: "select" */ '../views/list'),
    children: [
      {
        path: '/guanzhu',
        name: 'guanzhu',
        component: () => import(/* webpackChunkName: "select" */ '../views/list/guanzhu'),
      }
    ]
  },
  {
    path: '/slider',
    name: 'slider',
    component: () => import(/* webpackChunkName: "slider" */ '../views/slider')
  },
  {
    path: '/swiper',
    name: 'swiper',
    component: () => import(/* webpackChunkName: "swiper" */ '../views/swiper')
  },
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

router.beforeEach((to, from, next) => {
  if (to.matched.some(res => res.meta.requireAuth)) { // 验证是否需要登陆
    if (getToken()) { // 查询本地存储信息是否已经登陆
      next();
    } else {
      Message({
        message:  '您已退出登陆，继续浏览请先登陆',
        type: 'error',
        duration: 2 * 1000
      })
      next({
        path: '/login', // 未登录则跳转至login页面
        query: { redirect: to.fullPath } // 登陆成功后回到当前页面，这里传值给login页面，to.fullPath为当前点击的页面
      });
    }
  } else {
    next();
  }
});

export default router
