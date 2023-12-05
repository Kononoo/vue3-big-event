<script setup>
import { ref } from 'vue'
import PageContainer from '@/components/PageContainer.vue'
import { userUpdateInfoAPI } from "@/api/user";
import { useUserStore } from "@/stores";
// import { ElMessage } from "element-plus";

// 获取用户数据
const {
  user: { id, username, nickname, email },
  getUserInfo
} = useUserStore()

// 表单数据
const formRef = ref()
const form = ref({
  id,
  username,
  nickname,
  email
})
const rules = {
  nickname: [
    { required: true, message: '请输入用户昵称', trigger: 'blur'},
    { pattern: /^\S{2,10}$/,
      message: '昵称长度需要在2-10个非空字符内',
      trigger: 'blur'
    }
  ],
  email: [
    { required: true, message: '请输入用户邮箱', trigger: 'blur' },
    { type: 'email', message: '请输入正确的邮箱格式', trigger: ['blur', 'change']}
  ]
}


const submitForm = async () => {
  // 等待检验效果
  await formRef.value.validate()
  // 提交修改
  const res = await userUpdateInfoAPI(form.value)
  if (res.data.code === 0) {
    getUserInfo()  // 更新数据
    ElMessage.success(res.data.message)
  } else {
    ElMessage.error(res.data.message)
  }

}
</script>

<template>
  <page-container title="基本资料">
    <!-- 表单部分 -->
    <el-form :model="form" :rules="rules" ref="formRef" label-width="100px">
      <el-form-item label="登录名称">
        <el-input size="large" v-model="form.username" disabled style="width: 500px"></el-input>
      </el-form-item>
      <el-form-item label="用户昵称" prop="nickname">
        <el-input size="large" v-model="form.nickname" clearable style="width: 500px"></el-input>
      </el-form-item>
      <el-form-item label="用户邮箱" prop="email">
        <el-input size="large" v-model="form.email" clearable style="width: 500px"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="submitForm">提交修改</el-button>
      </el-form-item>
    </el-form>
  </page-container>
</template>

<style scoped></style>