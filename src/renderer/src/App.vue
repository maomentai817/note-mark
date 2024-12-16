<script setup>
import DraggableTopBar from './views/LayoutContainer/components/DraggableTopBar.vue'
import SideBar from './views/LayoutContainer/components/SideBar.vue'
import { onMounted } from 'vue'
import { useNoteStore } from '@/stores'
import MarkdownNote from './views/MarkdownNote/MarkdowNote.vue'

const noteStore = useNoteStore()
onMounted(async () => {
  noteStore.init()
})
</script>

<template>
  <div id="app">
    <!-- <router-view></router-view> -->
    <div id="mark-container">
      <draggable-top-bar />
      <el-container class="h-full">
        <el-aside class="w-250! h-full">
          <side-bar />
        </el-aside>
        <el-main class="p-0! flex-1 h-screen">
          <!-- 二级路由 -->
          <!-- <router-view></router-view> -->
          <markdown-note />
        </el-main>
      </el-container>
    </div>
  </div>
</template>
