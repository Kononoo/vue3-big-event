<script setup>
import { ref, onMounted } from 'vue'
import { artDeleteAPI, artGetListAPI } from "@/api/article";
import { Delete, Edit } from '@element-plus/icons-vue'
import PageContainer from '@/components/PageContainer.vue'
import ChannelSelect from '@/views/article/components/ChannelSelect.vue'
import { formatTime } from '@/utils/format'
import ArticleEdit from "@/views/article/components/ArticleEdit.vue";
import { ElMessage, ElMessageBox } from "element-plus";

// 文章列表  总条数
const articleList = ref([])
const total = ref()
// 定义请求参数对象 -> 获取文章列表方法
const params = ref({
  pagenum: 1,
  pagesize: 5,
  cate_id: '',
  state: ''
})
const loading = ref(false) // 加载效果

// 获取文章列表数据
const getArticleList = async () => {
  loading.value = true
  const res = await artGetListAPI(params.value)
  articleList.value = res.data.data
  total.value = res.data.total
  loading.value = false
}
onMounted(() => {
  getArticleList()
})

// 分页管理
const onSizeChange = (pageSize) => {
  params.value.pagesize = pageSize
  params.value.pagenum = 1
  getArticleList()
}
const onCurrentChange = (currentPage) => {
  params.value.pagenum = currentPage
  getArticleList()
}

// 表单处理
const onSearch = () => {
  params.value.pagenum = 1
  getArticleList()
}
const onReset = () => {
  params.value.cate_id = ''
  params.value.state = ''
  params.value.pagenum = 1
  getArticleList()
}

// 添加、编辑、删除文章处理
const articleEditRef = ref()
const onAddArticle = () => {
  articleEditRef.value.open({})
}
const onEditArticle = (row) => {
  articleEditRef.value.open(row)
}
const onDeleteArticle = async (row) => {
  await ElMessageBox.confirm('你确定要删除该文章吗？', 'warning', {
    confirmButtonText: '确认',
    cancelButtonText: '取消',
    type: 'warning'
  })
  const res = (await artDeleteAPI(row.id)).data
  if (res.code) {
    ElMessage.error(res.message)
  } else {
    ElMessage.success(res.message)
  }
  await getArticleList()
}

// 添加或编辑文章成功后的回调
const onSuccess = (type) => {
  if (type === 'add') {
    const lastPage = Math.ceil((total.value + 1) / params.value.pagesize)
    params.value.pagenum = lastPage
  }
  getArticleList()
}

</script>

<template>
  <page-container title="文章管理">
    <template #extra>
      <el-button type="primary" @click="onAddArticle">发布文章</el-button>
    </template>

    <!-- 表单区域 -->
    <el-form inline>
      <el-form-item label="文章分类：">
        <!--vue3: v-model是 :modelValue和@update:modelValue的缩写-->
        <!--默认名字是modelValue, 也可以自己改名如下： 为 :cateId 和 @update:cateId 的简写-->
        <!--则子组件需要：defineProps(['cateId']) defineEmit(['update:cateId'])-->
        <ChannelSelect v-model:cateId="params.cate_id" />
      </el-form-item>
      <el-form-item label="发布状态：">
        <el-select v-model="params.state">
          <el-option label="已发布" value="已发布" />
          <el-option label="草稿" value="草稿" />
        </el-select>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="onSearch">搜索</el-button>
        <el-button @click="onReset">重置</el-button>
      </el-form-item>
    </el-form>

    <!-- 表格区域 -->
    <el-table :data="articleList" style="width: 100%" v-loading="loading" height="400" stripe>
      <el-table-column label="文章标题" prop="title">
        <template #default="scope">
          <el-link type="primary" :underline="false">{{ scope.row.title }}</el-link>
        </template>
      </el-table-column>
      <el-table-column label="分类" prop="cate_name" />
      <el-table-column label="发表时间" prop="pub_date">
        <template #default="{ row }">
          {{ formatTime(row.pub_date) }}
        </template>
      </el-table-column>
      <el-table-column label="状态" prop="state" />
      <el-table-column label="操作" width="120">
        <template #default="{ row }">
          <el-button :icon="Edit" circle plain type="primary" @click="onEditArticle(row)" />
          <el-button
            :icon="Delete"
            circle
            plain
            type="danger"
            @click="onDeleteArticle(row)"
          />
        </template>
      </el-table-column>

      <template #empty>
        <el-empty description="没有数据" />
      </template>
    </el-table>

    <!--分页区域-->
    <el-pagination
      v-model:current-page="params.pagenum"
      v-model:page-size="params.pagesize"
      :page-sizes="[3, 5, 7, 10]"
      :background="true"
      layout="jumper, total, sizes, prev, pager, next"
      :total="total"
      @size-change="onSizeChange"
      @current-change="onCurrentChange"
      style="margin-top: 20px; justify-content: flex-end"
    />

    <!-- 编辑的抽屉区域 -->
    <article-edit ref="articleEditRef" @success="onSuccess" />
  </page-container>
</template>

<style scoped lang="scss"></style>