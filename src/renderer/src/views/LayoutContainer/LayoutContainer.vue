<script setup>
import DraggableTopBar from './components/DraggableTopBar.vue'
import SideBar from './components/SideBar.vue'
</script>

<template>
  <div id="mark-container">
    <draggable-top-bar />
    <el-container>
      <el-aside>
        <side-bar />
      </el-aside>
      <el-main>Main</el-main>
    </el-container>
  </div>
</template>

<style lang="scss" scoped></style>
