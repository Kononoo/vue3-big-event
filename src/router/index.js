import { createRouter, createWebHistory } from 'vue-router'

// createRouter 路由实例
// createWebHistory       配置history模式(不带#)
// createWebHashHistory   配置hash模式(带#)
const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: []
})

export default router
