<script setup>
import PageContainer from '@/components/PageContainer.vue'
import { ref, onMounted } from 'vue'
import { Delete, Edit } from '@element-plus/icons-vue'
import { artDelChannelAPI, artGetChannelAPI } from "@/api/article";
import ChannelEdit from "@/views/article/components/ChannelEdit.vue";
// import { ElMessage, ElMessageBox } from "element-plus";

// 文章列表获取  加载页面效果
const articleList = ref([])
const loading = ref(false)
const getChannelList = async () => {
  loading.value = true
  const res = await artGetChannelAPI()
  articleList.value = res.data.data
  loading.value = false
}
onMounted(() => {
  getChannelList()
})

// 编辑、添加、删除文章数据
const dialog = ref()
const onEditChannel = (row) => {
  dialog.value.open(row)
}
const onAddChannel = () => {
  dialog.value.open({})
}
const onDeleteChannel = async (row) => {
  await ElMessageBox.confirm('你确定要删除该分类吗?', '温馨提示', {
    type: 'warning',
    confirmButtonText: '确认',
    cancelButtonText: '取消'
  })
  await artDelChannelAPI(row.id)
  ElMessage.success('删除成功')
  getChannelList()

}
const onSuccess = () => {
  getChannelList()
}
</script>

<template>
  <PageContainer title="文章分类">
    <template #extra>
      <el-button type="primary" @click="onAddChannel">添加分类</el-button>
    </template>

    <el-table v-loading="loading" :data="articleList" style="width: 100%">
      <el-table-column type="index" label="序号" width="100" />
      <el-table-column prop="cate_name" label="分类名称" />
      <el-table-column prop="cate_alias" label="分类别名" />
      <el-table-column label="操作" width="100">
        <!-- row就是articleList的一项，$index是下标 -->
        <template #default="scope">
          <el-button type="primary" plain circle :icon="Edit" @click="onEditChannel(scope.row)" />
          <el-button type="danger" plain circle :icon="Delete" @click="onDeleteChannel(scope.row)" />
        </template>
      </el-table-column>
      <template #empty>
        <el-empty description="没有数据" />
      </template>
    </el-table>

    <channel-edit ref="dialog" @success="onSuccess"></channel-edit>
  </PageContainer>
</template>

<style scoped lang="scss">

</style>