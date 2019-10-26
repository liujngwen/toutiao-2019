import VueRouter from 'vue-router'
import Vue from 'vue'
import Login from '../views/login/index.vue'

import Home from '@/views/home'
import Welcome from '@/views/welcome'
import NotFound from '@/views/404'
Vue.use(VueRouter)
const router = new VueRouter({
// 配置对象
// 路由规则选项 routes  若干规则
  routes: [
    {
      path: '/login',
      component: Login
    },
    {
      path: '/',
      component: Home,
      children: [
        // 欢迎
        { path: '/', component: Welcome }
      ]
    },
    // 匹配  不符合路由规则的路径
    { path: '*', component: NotFound }
  ]
})
export default router
