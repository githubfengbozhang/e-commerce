export default [
  // 登录
  {
    path: '/Login',
    name: '登录',
    component: () => import('@/views/Login')
  },
  {
    path: '/Home',
    name: 'Home',
    component: () => import('@/views/Home')
  }
]
