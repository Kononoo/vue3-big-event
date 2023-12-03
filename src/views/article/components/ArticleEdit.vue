<script setup>
import { ref } from 'vue'
import { Plus } from '@element-plus/icons-vue'
import { baseURL } from '@/utils/request'
import { QuillEditor } from '@vueup/vue-quill'
import '@vueup/vue-quill/dist/vue-quill.snow.css'
import ChannelSelect from '@/views/article/components/ChannelSelect.vue'
import { artGetDetailAPI, artPublishAPI, artUpdateAPI } from "@/api/article";
import { ElMessage } from "element-plus";
import axios from "axios";

// 抽屉显示隐藏  默认数据(用于重置表单)  表单数据
const visibleDrawer = ref(false)
const defaultForm = ref({
  title: '',
  cate_id: '',
  cover_img: '',
  content: '',
  state: ''
})
const formModel = ref({ ...defaultForm })

// 图片上传功能
const formRef = ref()
const imgUrl = ref('')
const onSelectFile = (uploadFile) => {
  imgUrl.value = URL.createObjectURL(uploadFile.raw) // 预览图片
  // 立刻将图片对象，存入 formModel.value.cover_img 将来用于提交
  formModel.value.cover_img = uploadFile.raw
}

// 文章上传
const emit = defineEmits(['success'])
const onPublish = async (state) => {
  formModel.value.state = state
  // 将普通对象 => formData 对象
  const formData = new FormData()
  for (let key in formModel) {
    formData.append(formModel.value[key])
  }

  // 发送请求 1 编辑操作  2 添加操作
  if (formModel.value.id) {
    const res = (await artUpdateAPI(formData)).data
    if (res.status) {
      ElMessage.error(res.message)
    } else {
      ElMessage.success(res.message)
      emit('success', 'edit')
    }
    visibleDrawer.value = false
  } else {
    const res = (await artPublishAPI(formData)).data
    if (res.status) {
      ElMessage.error(res.message)
    } else {
      ElMessage.success(res.message)
      emit('success', 'add')
    }
    visibleDrawer.value = false
  }
}

// 打开抽屉方法，暴露出去由父组件控制
const editorRef = ref()
const open = async (row) => {
  console.log(row)
  visibleDrawer.value = true
  if (row.id) {
    const res = await artGetDetailAPI(row.id)
    formModel.value = res.data.data
    // 图片需要单独处理回显
    imgUrl.value = baseURL + formModel.value.cover_img
    // 需要将网络图片地址 => file对象存储起来，将来便于提交
    const file = await imageUrlToFileObject(imgUrl.value, formModel.value.cover_img)
    formModel.value.cover_img = file
  } else {
    // 分别重置表单数据、文本编辑器数据
    formModel.value = { ...defaultForm }
    imgUrl.value = ''
    editorRef.value.setHTML('')
  }
}

// 将网路图片地址转化为 File 对象
const imageUrlToFileObject = async (imageUrl, filename) => {
  try {
    // 使用 Axios 下载图片数据
    const response = await axios.get(imageUrl, { responseType: 'arraybuffer' })
    // 将下载的数据转换成 Blob 对象
    const blob = new Blob([response.data], {
      type: response.headers['content-type']
    })
    // 创建 File 对象
    const file = new File([blob], filename, {
      type: response.headers['content-type']
    })
    return file
  } catch (error) {
    console.error('Error converting image URL to File object:', error)
    return null
  }
}

// defineExpose({open})
</script>

<template>
  <el-drawer
    v-model="visibleDrawer"
    :title="formModel.id ? '编辑文章' : '添加文章'"
    direction="rtl"
    size="50%"
  >
    <!-- 文章表单 -->
    <el-form :model="formModel" ref="formRef" label-width="100">
      <el-form-item label="文章标题" prop="title">
        <el-input v-model="formModel" placeholder="请输入标题" />
      </el-form-item>
      <el-form-item label="文章分类" prop="cate_id">
        <ChannelSelect v-model:cateId="formModel.cate_id" width="100%" />
      </el-form-item>
      <el-form-item label="文章封面" prop="cover_img">
        <!-- 头像上传功能 -->
        <!-- 关闭自动上传action 只要能本地预览图片即可，无需提交前上传图片
             语法：URL.createObjectURL() 创建本地雨来的地址来预览
         -->
        <el-upload
          class="avatar-uploader"
          :auto-upload="false"
          :show-file-list="false"
          :on-change="onSelectFile"
        >
          <img v-if="imgUrl" :src="imgUrl" class="avatar" />
          <el-icon v-else class="avatar-uploader-icon"> <Plus /> </el-icon>
        </el-upload>
      </el-form-item>
      <!-- 文本编辑器 -->
      <el-form-item label="文章内容" prop="content">
        <div class="editor">
          <QuillEditor
            ref="editorRef"
            v-model:content="formModel.content"
            contentType="html"
            theme="snow"
          />
        </div>
      </el-form-item>
      <el-form-item>
        <el-button @click="onPublish('已发布')" type="primary">发布</el-button>
        <el-button @click="onPublish('草稿')" type="info">草稿</el-button>
      </el-form-item>
    </el-form>
  </el-drawer>
</template>

<style scoped lang="scss">
.avatar-uploader {
  :deep() {
    .avatar {
      width: 178px;
      height: 178px;
      display: block;
    }
    .el-upload {
      border: 1px dashed var(--el-border-color);
      border-radius: 6px;
      cursor: pointer;
      position: relative;
      overflow: hidden;
      transition: var(--el-transition-duration-fast);
      &:hover {
        border-color: var(--el-color-primary);
      }
    }
    .el-icon.avatar-uploader-icon {
      font-size: 28px;
      color: #8c939d;
      width: 178px;
      height: 178px;
      text-align: center;
    }
  }
}
.editor {
  width: 100%;
  :deep(.ql-editor) {
    min-height: 200px;
  }
}
</style>