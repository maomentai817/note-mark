<script setup>
import { noteMock } from '@/stores/mocks'
</script>

<template>
  <div id="note-preview-list" class="mt-12 space-y-4">
    <template v-if="noteMock.length">
      <NotePreviewItem
        v-for="(note, index) in noteMock"
        :key="index"
        :note="note"
      />
    </template>
    <template v-else>
      <ul class="p-t-16 text-center">
        No Notes Yet!
      </ul>
    </template>
  </div>
</template>

<style lang="scss" scoped></style>
