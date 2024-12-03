<script setup>
import { formatDateFromMs } from '@/utils/index.js'
defineProps({
  note: {
    type: Object,
    default: () => ({})
  },
  isActive: {
    type: Boolean,
    default: false
  }
})
</script>

<template>
  <div
    id="note-preview-item"
    class="cursor-pointer p-x-10 p-y-12 rounded-6 transition-colors duration-75"
    :class="{ 'active-note': isActive, 'unactive-note': !isActive }"
  >
    <h3 id="note-title" class="m-b-4 fw-600 text-overflow">{{ note.title }}</h3>
    <span
      id="time"
      class="inline-block w-full m-b-8 text-12 leading-16 fw-300 text-left"
    >
      {{ formatDateFromMs(note.lastEditTime) }}
    </span>
  </div>
</template>

<style lang="scss" scoped>
.active-note {
  background-color: rgba(161, 161, 170, 0.75);
}
.unactive-note:hover {
  background-color: rgba(113, 113, 122, 0.75);
}
</style>
