<script setup lang="ts">
import HelloWorld from '@/views/home.vue'
</script>

<template>
  <div>
    <el-container>
      <el-main
        ><HelloWorld />
        <helloworld2 />
      </el-main>
      <!-- <el-footer>Footer</el-footer> -->
    </el-container>
    <MyFooter></MyFooter>
  </div>
</template>
<style scoped>
.el-container {
  height: 100%; /* 使容器充满整个.common-layout */
  width: auto; /* 使容器宽度充满整个视口 */
}

.el-header,
.el-footer {
  flex: none; /* 不让头部和底部占据额外空间 */
}
</style>
