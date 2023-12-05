<script setup>
import {ref} from "vue"
import PageContainer from "@/components/PageContainer.vue";
import { userUpdatePasswordAPI } from "@/api/user";
import { useUserStore } from "@/stores";
import { useRouter } from "vue-router";

const formRef = ref()
const formData = ref({
  old_pwd: '',
  new_pwd: '',
  re_pwd: '',
})

// 校验新密码不能和旧密码一样
const checkDifferent = (rule, value, callback) => {
  if (value === formData.value.old_pwd) {
    callback(new Error('新密码不能和旧密码一样'))
  } else {
    callback()
  }
}
// 检验两次密码是否一样
const checkSameAsNewPwd = (rule, value, callback) => {
  if (value !== formData.value.new_pwd) {
    callback(new Error('两次数据的密码不相等'))
  } else {
    callback()
  }
}

const rules = {
  old_pwd:[
    {required: true, message: '请输入原密码', trigger: 'blur'},
    {min: 6, max: 15, message: '原密码长度在6-15位之间', trigger: 'blur'},
  ],
  new_pwd:[
    {required: true, message: '请输入新密码', trigger: 'blur'},
    { min: 6, max: 15, message: '新密码长度在6-15位之间', trigger: 'blur' },
    { validator: checkDifferent, trigger: 'blur'},
  ],
  re_pwd:[
    {required: true, message: '请再次输入密码', trigger: 'blur'},
    { min: 6, max: 15, message: '确认密码长度在6-15位之间', trigger: 'blur' },
    {validator: checkSameAsNewPwd, trigger: 'blur'},
  ]
}

const userStore = useUserStore();
const router = useRouter();

const submitForm = async () => {
  await formRef.value.validate()
  const res = await userUpdatePasswordAPI(formData.value)
  if (res.data.code === 0) {
    ElMessage({
      type: 'success',
      message: res.data.message
    })
  }
  // 密码修改成功后，清除信息，重新登录
  userStore.removeToken()
  userStore.setUser({})
  // 跳转到登录页
  await router.push('/login')
}
const resetForm = () => {
  formRef.value.resetFields()
}

</script>

<template>
  <PageContainer title="重置密码">
    <el-row>
      <el-col :span="12">
        <el-form :model="formData" :rules="rules" ref="formRef" label-width="100px" size="large">
          <el-form-item label="原密码" prop="old_pwd">
            <el-input v-model="formData.old_pwd" show-password></el-input>
          </el-form-item>
          <el-form-item label="新密码" prop="new_pwd">
            <el-input v-model="formData.new_pwd" show-password></el-input>
          </el-form-item>
          <el-form-item label="确认新密码" prop="re_pwd">
            <el-input v-model="formData.re_pwd" show-password></el-input>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="submitForm">修改密码</el-button>
            <el-button type="info" @click="resetForm">重置</el-button>
          </el-form-item>
        </el-form>
      </el-col>
    </el-row>
  </PageContainer>
</template>

<style scoped>

</style>