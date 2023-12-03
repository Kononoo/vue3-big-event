import { createRouter, createWebHistory } from 'vue-router'
import { useUserStore } from "@/stores";

// createRouter 路由实例
// createWebHistory       配置history模式(不带#)
// createWebHashHistory   配置hash模式(带#)
const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  // 路由懒加载：当路由被访问的时候才加载对应组件，这样就会更加高效
  routes: [
    {
      path: '/login',
      component: () => import('@/views/login/LoginPage.vue')
    },
    {
      path: '/',
      component: () => import('@/views/layout/index.vue'),
      redirect: '/article/manage',
      children: [
        {
          path: '/article/manage',
          component: () => import('@/views/article/ArticleManage.vue')
        },
        {
          path: '/article/channel',
          component: () => import('@/views/article/ArticleChannel.vue')
        },
        {
          path: '/user/profile',
          component: () => import('@/views/user/UserProfile.vue')
        },
        {
          path: '/user/avatar',
          component: () => import('@/views/user/UserAvatar.vue')
        },
        {
          path: '/user/password',
          component: () => import('@/views/user/UserPassword.vue')
        },
      ]
    }
  ]
})

// 登录访问拦截 => 默认是直接放行
// 1 undefined / true 直接放行     2 false返回from页面
router.beforeEach((to) => {
  const userStore = useUserStore();
  if (to.path === '/login') {
    return true
  } else if (!userStore.token) {
    return '/login'
  }
})

export default router
