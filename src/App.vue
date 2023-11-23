<script setup>
// 获取路由对象 router  const router = useRouter()
// 获取路由参数 route   const route = useRoute()
import { useRouter, useRoute } from 'vue-router'

const router = useRouter()
const route = useRoute()
const goList = () => {
  router.push('/list')
  console.log(router)
  console.log(route)
}
</script>

<template>
  <h2>I am App</h2>
  <div>
    <el-button type="danger" @click="router.push('/home')"
      >跳转到首页</el-button
    >
    <el-button type="danger" @click="router.go(1)">跳转到表业</el-button>
    <el-button type="danger" @click="goList">跟我走吧</el-button>
  </div>
</template>

<style scoped></style>

<!--
<script setup>
import { RouterLink, RouterView } from 'vue-router'
</script>

<template>
  <header>
    <img
      alt="Vue logo"
      class="logo"
      src="@/assets/logo.png"
      width="125"
      height="125"
    />

    <div class="wrapper">
      &lt;!&ndash; <HelloWorld msg="You did it!" /> &ndash;&gt;

      <nav>
        <RouterLink to="/">Home</RouterLink>
        <RouterLink to="/about">About</RouterLink>
      </nav>
    </div>
  </header>

  <RouterView />
</template>

<style scoped>
header {
  line-height: 1.5;
  max-height: 100vh;
}

.logo {
  display: block;
  margin: 0 auto 2rem;
}

nav {
  width: 100%;
  font-size: 12px;
  text-align: center;
  margin-top: 2rem;
}

nav a.router-link-exact-active {
  color: var(&#45;&#45;color-text);
}

nav a.router-link-exact-active:hover {
  background-color: transparent;
}

nav a {
  display: inline-block;
  padding: 0 1rem;
  border-left: 1px solid var(&#45;&#45;color-border);
}

nav a:first-of-type {
  border: 0;
}

@media (min-width: 1024px) {
  header {
    display: flex;
    place-items: center;
    padding-right: calc(var(&#45;&#45;section-gap) / 2);
  }

  .logo {
    margin: 0 2rem 0 0;
  }

  header .wrapper {
    display: flex;
    place-items: flex-start;
    flex-wrap: wrap;
  }

  nav {
    text-align: left;
    margin-left: -1rem;
    font-size: 1rem;

    padding: 1rem 0;
    margin-top: 1rem;
  }
}
</style>
-->
