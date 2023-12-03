<script setup>
defineProps({
  title: {
    required: true,
    type: String
  }
})
</script>

<template>
  <el-card class="page-container">
    <template #header>
      <div class="header">
        <span>{{ title }}</span>
        <div class="extra">
          <slot name="extra" />
        </div>
      </div>
    </template>
    <slot></slot>
  </el-card>
</template>

<style scoped lang="scss">
.page-container {
  min-height: 100%;
  box-sizing: border-box;
  background-color: #67c23a;
  .header {
    display: flex;
    align-items: center;
    justify-content: space-between;
  }
}
</style>