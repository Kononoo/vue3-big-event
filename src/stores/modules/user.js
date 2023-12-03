import { defineStore } from 'pinia'
import { ref } from 'vue'
import { userGetInfoAPI } from "@/api/user";

export const useUserStore = defineStore(
  'big-user',
  () => {
    const token = ref('')
    const setToken = (newToken) => {
      token.value = newToken
    }
    const removeToken = () => {
      token.value = ''
    }

    const user = ref({})
    const getUserInfo = async () => {
      const res = await userGetInfoAPI();
      user.value = res.data.data
    }
    const setUser = (value) => {
      user.value = value
    }

    return {
      token,
      setToken,
      removeToken,
      user,
      getUserInfo,
      setUser
    }
  },
  {
    persist: true
  }
)
