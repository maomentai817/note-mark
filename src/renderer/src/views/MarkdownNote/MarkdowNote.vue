<script setup>
import readme from './README.md'
</script>

<template>
  <div
    id="markdown-note"
    class="flex-1 overflow-auto border-1 bg-zinc-900/50 border-l-white/20 wh-full"
  >
    <readme />
  </div>
</template>

<style lang="scss" scoped>
:deep(.markdown-body) {
  // --borderColor-muted: #fff;
  // --borderColor-default: #fff;
  font-family: ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas,
    'Liberation Mono', 'Courier New', monospace;
  background-color: transparent;
  ul {
    list-style-type: disc;
  }
  ol {
    list-style-type: decimal;
  }
  hr {
    background-color: #fff;
  }
  pre {
    background-color: #31363f8f;
  }
}
</style>
