<script setup>
import DraggableTopBar from './components/DraggableTopBar.vue'
import SideBar from './components/SideBar.vue'
import { onMounted } from 'vue'
import { useNoteStore } from '@/stores'

const noteStore = useNoteStore()
onMounted(async () => {
  noteStore.init()
})
</script>

<template>
  <div id="mark-container">
    <draggable-top-bar />
    <el-container class="h-full">
      <el-aside class="w-250! h-full">
        <side-bar />
      </el-aside>
      <el-main class="p-0! flex-1 h-screen">
        <!-- 二级路由 -->
        <router-view></router-view>
      </el-main>
    </el-container>
  </div>
</template>

<style lang="scss" scoped></style>
