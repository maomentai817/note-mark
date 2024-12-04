<script setup>
import { useNoteStore } from '@/stores'

const noteStore = useNoteStore()

const handleNoteSelect = (index) => {
  noteStore.selectNote(index)
}
</script>

<template>
  <div id="note-preview-list" class="mt-12 space-y-4">
    <template v-if="noteStore.notes.length">
      <NotePreviewItem
        v-for="(note, index) in noteStore.notes"
        :key="index"
        :note="note"
        :isActive="noteStore.selectedNoteIndex === index"
        @click="handleNoteSelect(index)"
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
