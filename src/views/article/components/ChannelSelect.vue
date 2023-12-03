<script setup>
import { artGetChannelAPI } from '@/api/article'
import { ref, onMounted } from 'vue'

// defineProps({
//   cateId: {
//     type: [Number, String]
//   }
// })

const channelList = ref([])
const getChannelList = async () => {
  const res = await artGetChannelAPI()
  channelList.value = res.data.data
}
onMounted(() => {
  getChannelList()
})

// defineProps(['modelValue'])
// defineEmits(['update:modelValue'])
defineProps({ cateId: [Number, String], width: String })
defineEmits(['update:cateId'])
</script>

<template>
  <el-select
    :model-value="cateId"
    @update:modelValue="$emit('update:cateId', $event)"
    :style="{ width }"
  >
    <el-option
      v-for="channel in channelList"
      :key="channel.id"
      :label="channel.cate_name"
      :value="channel.id"
    />
  </el-select>
</template>

<style scoped></style>