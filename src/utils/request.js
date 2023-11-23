import axios from "axios";
import {useUserStore} from "@/stores";
import { ElMessage } from "element-plus";
import router from '@/router'

const baseURL = 'http://big-event-vue-api-t.itheima.net'
const httpInstance = axios.create({
  baseURL: baseURL,
  timeout: 3000,    // 超时时间2.5s
});

// 添加请求拦截器
httpInstance.interceptors.request.use(config => {
  // 在发送请求之前做些什么
  const userStore = useUserStore();
  if (userStore.token) {
    config.headers.Authorization = userStore.token
  }
  return config;
},  error => {
  // 对请求错误做些什么
  return Promise.reject(error);
});

// 添加响应拦截器
httpInstance.interceptors.response.use(res => {
  if (res.data.code === 0) {
    return res
  }
  // 处理业务失败，给出错误提示
  return Promise.reject(res.data)
}, e => {
  // 统一错误提示
  ElMessage({
    type: "error",
    message: e.response.data.message || '服务异常'
  })
  // 401token失效处理
  // 1 清除本地数据   2 跳转登录页
  if (e.response?.status === 401) {
    const userStore = useUserStore()
    userStore.removeToken()
    // 组件是 .vue 文件 不需要导包 自动导了, 这是js文件必须导包
    ElMessage({
      type: 'error',
      message: '登录身份过期，请重新登录!' || '服务异常'
    })
    setTimeout(() => {
      router.push('/login')
    }, 500)
  }
  return Promise.reject(e)
})

export default httpInstance