import Vue from 'vue'
import Router from 'vue-router'
import { storage } from "../utils/constant"

Vue.use(Router)

import Layout from '@/layout'

export const constantRoutes = [
  // {
  //   path: '/Login',
  //   name: '登录',
  //   component: () => import('@/views/Login/index')
  // },
  {
    path: '/',
    component: Layout,
    redirect: '/dashboard',
    children: [{
      path: 'dashboard',
      name: '首页',
      component: () => import('@/views/dashboard/index'),
      meta: { title: '首页', icon: 'dashboard' }
    }]
  },
  {
    path: '/fireManger',
    component: Layout,
    name: '消防管理',
    children: [{
      path: '/fireManger',
      name: '电气火灾检查',
      component: () => import('@/views/fireManger/index'),
      meta: { title: '电气火灾检查', icon: 'dashboard' }
    }]
  },
  {
    path: '/videoSurveillance',
    component: Layout,
    name: '视频监控',
    children: [{
      path: '/videoSurveillance',
      name: '视频监控',
      component: () => import('@/views/videoSurveillance/index'),
      meta: { title: '视频监控', icon: 'dashboard' }
    }]
  },
  {
    path: '/accessManger',
    component: Layout,
    name: '门禁管理',
    children: [{
      path: '/accessManger',
      name: '人员进出',
      component: () => import('@/views/accessManger/index'),
      meta: { title: '人员进出', icon: 'dashboard' }
    }]
  }
]
localStorage.setItem(storage.ROUTEMATCH, JSON.stringify(constantRoutes))
const createRouter = () => new Router({
  // mode: 'history', // require service support
  routes: constantRoutes
})
const router = createRouter()

export function resetRouter () {
  const newRouter = createRouter()
  router.matcher = newRouter.matcher // reset router
}

export default router
