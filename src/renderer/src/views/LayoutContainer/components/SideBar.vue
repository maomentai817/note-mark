<script setup>
import { ref } from 'vue'
import NotePreviewList from '@/views/NotePreviewList/NotePreviewList.vue'
import { useNoteStore } from '@/stores/modules/note'
const operateWindow = async (type) => {
  switch (type) {
    case 'close':
      window.context.close()
      break
    case 'min':
      window.context.minimize()
      break
    case 'max':
      // electron 设置亚克力材质, 最大化丢失
      // window.context.maximize()
      break
  }
}

const noteStore = useNoteStore()

const sidebarContent = ref(null)
const handleDelNote = () => {
  noteStore.deleteNote()
  sidebarContent.value.scrollTop = 0
}
</script>

<template>
  <div id="mark-sidebar" class="w-250 p-t-40">
    <div id="mac-taffic-btns" class="h-40 f-s absolute top-0 left-0">
      <div id="close" class="operate-btn" @click="operateWindow('close')">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="14"
          height="14"
          viewBox="0 0 24 24"
        >
          <g id="close_line" fill="none" fill-rule="evenodd">
            <path
              d="M24 0v24H0V0zM12.593 23.258l-.011.002-.071.035-.02.004-.014-.004-.071-.035c-.01-.004-.019-.001-.024.005l-.004.01-.017.428.005.02.01.013.104.074.015.004.012-.004.104-.074.012-.016.004-.017-.017-.427c-.002-.01-.009-.017-.017-.018m.265-.113-.013.002-.185.093-.01.01-.003.011.018.43.005.012.008.007.201.093c.012.004.023 0 .029-.008l.004-.014-.034-.614c-.003-.012-.01-.02-.02-.022m-.715.002a.023.023 0 0 0-.027.006l-.006.014-.034.614c0 .012.007.02.017.024l.015-.002.201-.093.01-.008.004-.011.017-.43-.003-.012-.01-.01z"
            />
            <path
              fill="#0000005f"
              d="m12 13.414 5.657 5.657a1 1 0 0 0 1.414-1.414L13.414 12l5.657-5.657a1 1 0 0 0-1.414-1.414L12 10.586 6.343 4.929A1 1 0 0 0 4.93 6.343L10.586 12l-5.657 5.657a1 1 0 1 0 1.414 1.414z"
            />
          </g>
        </svg>
      </div>
      <div id="min" class="operate-btn" @click="operateWindow('min')">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="14"
          height="14"
          viewBox="0 0 24 24"
        >
          <g id="minimize_line" fill="none" fill-rule="evenodd">
            <path
              d="M24 0v24H0V0zM12.593 23.258l-.011.002-.071.035-.02.004-.014-.004-.071-.035c-.01-.004-.019-.001-.024.005l-.004.01-.017.428.005.02.01.013.104.074.015.004.012-.004.104-.074.012-.016.004-.017-.017-.427c-.002-.01-.009-.017-.017-.018m.265-.113-.013.002-.185.093-.01.01-.003.011.018.43.005.012.008.007.201.093c.012.004.023 0 .029-.008l.004-.014-.034-.614c-.003-.012-.01-.02-.02-.022m-.715.002a.023.023 0 0 0-.027.006l-.006.014-.034.614c0 .012.007.02.017.024l.015-.002.201-.093.01-.008.004-.011.017-.43-.003-.012-.01-.01z"
            />
            <path
              fill="#0000005f"
              d="M3 12a1 1 0 0 1 1-1h16a1 1 0 1 1 0 2H4a1 1 0 0 1-1-1"
            />
          </g>
        </svg>
      </div>
      <div id="max" class="operate-btn" @click="operateWindow('max')">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="14"
          height="14"
          viewBox="0 0 24 24"
        >
          <g id="fullscreen_2_line" fill="none" fill-rule="nonzero">
            <path
              d="M24 0v24H0V0h24ZM12.593 23.258l-.011.002-.071.035-.02.004-.014-.004-.071-.035c-.01-.004-.019-.001-.024.005l-.004.01-.017.428.005.02.01.013.104.074.015.004.012-.004.104-.074.012-.016.004-.017-.017-.427c-.002-.01-.009-.017-.017-.018Zm.265-.113-.013.002-.185.093-.01.01-.003.011.018.43.005.012.008.007.201.093c.012.004.023 0 .029-.008l.004-.014-.034-.614c-.003-.012-.01-.02-.02-.022Zm-.715.002a.023.023 0 0 0-.027.006l-.006.014-.034.614c0 .012.007.02.017.024l.015-.002.201-.093.01-.008.004-.011.017-.43-.003-.012-.01-.01-.184-.092Z"
            />
            <path
              fill="#0000005f"
              d="M9.793 12.793a1 1 0 0 1 1.497 1.32l-.083.094L6.414 19H9a1 1 0 0 1 .117 1.993L9 21H4a1 1 0 0 1-.993-.883L3 20v-5a1 1 0 0 1 1.993-.117L5 15v2.586l4.793-4.793ZM20 3a1 1 0 0 1 .993.883L21 4v5a1 1 0 0 1-1.993.117L19 9V6.414l-4.793 4.793a1 1 0 0 1-1.497-1.32l.083-.094L17.586 5H15a1 1 0 0 1-.117-1.993L15 3h5Z"
            />
          </g>
        </svg>
      </div>
    </div>
    <div id="action-btns" class="f-b m-t-4 p-8">
      <NewNoteButton @click="noteStore.createNote()" />
      <DelNoteButton @click="handleDelNote" />
    </div>
    <div
      id="sidebar-content"
      class="p-8 h-86vh overflow-auto"
      ref="sidebarContent"
    >
      <NotePreviewList></NotePreviewList>
    </div>
  </div>
</template>

<style lang="scss" scoped>
#mark-sidebar {
  #mac-taffic-btns {
    -webkit-app-region: no-drag;
    &:hover {
      #close,
      #min,
      #max {
        svg {
          opacity: 1;
        }
      }
    }
    .operate-btn {
      width: 16px;
      height: 16px;
      border-radius: 50%;
      display: flex;
      justify-content: center;
      align-items: center;
      margin-left: 10px;
      cursor: pointer;
      z-index: 9999;
    }
    #close,
    #min,
    #max {
      svg {
        opacity: 0;
        transition: all 0.3s;
      }
    }
    #close {
      background-color: #ff5f57;
    }
    #min {
      background-color: #ffbd2e;
    }
    #max {
      background-color: #28c840;
    }
  }
}
</style>
