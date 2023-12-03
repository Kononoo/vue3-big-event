<script setup>
// 获取路由对象 router  const router = useRouter()
// 获取路由参数 route   const route = useRoute()
import { useRouter, useRoute } from 'vue-router'
import { useUserStore } from '@/stores/modules/user'
import { useCounterStore } from '@/stores/modules/counter'

const router = useRouter()
const route = useRoute()
const goList = () => {
  router.push('/list')
  console.log(router)
  console.log(route)
}
const userStore = useUserStore()
const countStore = useCounterStore()
</script>

<template>
    <router-view />
<!-- 测试代码 -->
<!--  <h2>I am App</h2>-->
<!--  <div>-->
<!--    <el-button type="danger" @click="router.push('/home')">跳转到首页</el-button>-->
<!--    <el-button type="danger" @click="router.go(1)">跳转到表业</el-button>-->
<!--    <el-button type="danger" @click="goList">跟我走吧</el-button>-->

<!--    <p>{{ userStore.token }}</p>-->
<!--    <el-button type="success" round @click="userStore.setToken('hello')">登录 </el-button>-->
<!--    <el-button type="success" round @click="userStore.removeToken">退出登录 </el-button>-->
<!--    <hr />-->
<!--    <p>{{ countStore.count }} - {{ countStore.doubleCount }}</p>-->
<!--    <el-button type="primary" round @click="countStore.increment">点击我加加</el-button>-->
<!--  </div>-->
</template>

<style scoped>
* {
  margin: 10px auto;

}
</style>
