<script setup>
import {ref} from "vue"
import PageContainer from "@/components/PageContainer.vue";
import { useUserStore } from "@/stores";
import { Plus, Upload } from "@element-plus/icons-vue";
import { userUpdateAvatarAPI } from "@/api/user";
// import { ElMessage } from "element-plus";

const userStore = useUserStore();
userStore.getUserInfo()
const imgUrl = ref(userStore.user.user_pic)
const uploadRef = ref()
const onSelectFile = (uploadFile) => {
  // 基于 FileReader 读取图片做预览  转成base64编码
  const reader = new FileReader()
  reader.readAsDataURL(uploadFile.raw)
  reader.onload = () => {
    imgUrl.value = reader.result
  }
  console.log(imgUrl.value)
}

// 更新用户头像
const onUpdateAvatar = async () => {
  // 发送请求，更换用户头像
  await userUpdateAvatarAPI(imgUrl.value)
  // userStore 重新渲染
  await userStore.getUserInfo()
  ElMessage({
    type: 'success',
    message: '更新头像成功！'
  })
}
</script>

<template>
  <PageContainer title="更换头像">
    <el-upload
      ref="uploadRef"
      class="avatar-uploader"
      :autofocus="false"
      :show-file-list="false"
      :on-change="onSelectFile"
      style="margin-bottom: 10px;"
    >
      <img v-if="imgUrl" :src="imgUrl" class="avatar" />
      <el-icon v-else class="avatar-uploader-icon"><Plus /></el-icon>
    </el-upload>

    <el-button type="primary" :icon="Plus" size="large" @click="uploadRef.$el.querySelector('input').click()">选择图片</el-button>
    <el-button type="danger" :icon="Upload" size="large" @click="onUpdateAvatar" style="margin-left: 40px">上传头像</el-button>
  </PageContainer>
</template>

<style scoped lang="scss">

.avatar-uploader .el-upload {
  border: 1px dashed var(--el-border-color);
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
  transition: var(--el-transition-duration-fast);
  .avatar {
    width: 278px;
    height: 278px;
    display: block;
    border-radius: 5px;
  }
}

.avatar-uploader .el-upload:hover {
  border-color: var(--el-color-primary);
}

.el-icon.avatar-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 278px;
  height: 278px;
  text-align: center;
}
</style>