<script setup>
import { ref } from 'vue'
import { artAddChannelAPI, artEditChannelAPI } from "@/api/article";
// import { ElMessage } from "element-plus";

// 弹窗可见性  表单数据获取、校验
const dialogVisible = ref(false)
const formRef = ref()
const formData = ref({
  cate_name: '',
  cate_alias: ''
})
const rules = {
  cate_name: [
    {required: true, message:'请输入分类名称', trigger: 'blur'},
    {
      pattern: /^\S{1,10}$/,
      message: '分类名必须是 1-10 位的非空字符',
      trigger: 'blur'
    },
  ],
  cate_alias: [
    {required: true, message: '请输入分类别名', trigger: 'blur'},
    {
      pattern: /^[a-zA-Z0-9]{1,15}$/,
      message: '分类名必须是 1-15 位的字母或数字',
      trigger: 'blur'
    }
  ]
}

// 提交表单，发送请求  通知父组件
const emit = defineEmits(['success'])
const onSubmit = async () => {
  await formRef.value.validate()
  const edit = formData.value.id
  if (edit) {
    await artEditChannelAPI(formData.value)
  } else {
    await artAddChannelAPI(formData.value)
  }
  ElMessage({
    type: 'success',
    message: formData.value.id ? '编辑成功' : '添加成功'
  })
  dialogVisible.value = false
  emit('success')
}

// 对外暴露方法open，父组件通过open传递数据，区分编辑还是添加
// 有row是编辑，表示表单要回显数据    无row{}则是添加
const open = (row) => {
  dialogVisible.value = true
  formData.value = {...row}
}
// 向外暴露方法
defineExpose({ open })

</script>

<template>
  <el-dialog v-model="dialogVisible" :title="formData.id ? '编辑分类': '添加分类'" width="30%">
    <el-form :model="formData" ref="formRef" :rules="rules" >
      <el-form-item label="分类名称" prop="cate_name">
        <el-input v-model="formData.cate_name" placeholder="请输入分类名称" minlength="1" maxlength="10"/>
      </el-form-item>
      <el-form-item label="分类别名" prop="cate_alias">
        <el-input v-model="formData.cate_alias" placeholder="请输入分类别名" minlength="1" maxlength="15"/>
      </el-form-item>
    </el-form>
    <template #footer>
      <span class="dialog-footer">
        <el-button @click="dialogVisible = false">取消</el-button>
        <el-button type="primary" @click="onSubmit"> 确认 </el-button>
      </span>
    </template>
  </el-dialog>
</template>

<style scoped>

</style>