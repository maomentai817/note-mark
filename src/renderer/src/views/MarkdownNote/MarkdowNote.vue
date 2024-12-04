<script setup>
import Vditor from 'vditor'
import 'vditor/dist/index.css'
import { ref, onMounted, watch } from 'vue'
import { useNoteStore } from '@/stores'

// 2. 获取DOM引用
const vditor = ref(null)
const noteStore = useNoteStore()

onMounted(() => {
  vditor.value = new Vditor('vditor', {
    height: '95%',
    width: '100%',
    toolbarConfig: {
      hide: true
    },
    toolbar: [],
    theme: 'dark',
    mode: 'ir',
    typewriterMode: true,
    preview: {
      hljs: {
        style: 'github'
      },
      theme: {
        current: 'dark'
      }
    },
    after: () => {
      vditor.value.setValue(noteStore.selectedNote?.content)
    }
  })
})
watch(
  () => noteStore.selectedNoteIndex,
  () => {
    vditor.value?.setValue(noteStore.selectedNote?.content)
  },
  {
    immediate: true
  }
)
</script>

<template>
  <div
    id="markdown-note"
    class="flex-1 overflow-auto border-1 bg-zinc-900/50 border-l-white/20 wh-full"
  >
    <floating-note-title class="p-t-8">{{
      noteStore.selectedNote?.title
    }}</floating-note-title>
    <div id="vditor" ref="vditor" class="vditor-reset"></div>
  </div>
</template>

<style lang="scss" scoped>
// :deep(.markdown-body) {
//   // --borderColor-muted: #fff;
//   // --borderColor-default: #fff;
//   font-family: ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas,
//     'Liberation Mono', 'Courier New', monospace;
//   background-color: transparent;
//   ul {
//     list-style-type: disc;
//   }
//   ol {
//     list-style-type: decimal;
//   }
//   hr {
//     background-color: #fff;
//   }
//   pre {
//     background-color: #31363f8f;
//   }
// }
:deep(.vditor) {
  border: 0 !important;
}
:deep(.vditor-toolbar--hide) {
  height: 0;
  border: 0;
}
:deep(.vditor-content) {
  --panel-background-color: transparent;
  --textarea-background-color: transparent;
}
</style>
