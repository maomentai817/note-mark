<script setup>
import Vditor from 'vditor'
import 'vditor/dist/index.css'
import { ref, onMounted } from 'vue'

// 2. 获取DOM引用
const vditor = ref(null)

onMounted(() => {
  vditor.value = new Vditor('vditor', {
    height: '100%',
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
    }
  })
})
</script>

<template>
  <div
    id="markdown-note"
    class="flex-1 overflow-auto border-1 bg-zinc-900/50 border-l-white/20 wh-full"
  >
    <div id="vditor" class="vditor-reset"></div>
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
