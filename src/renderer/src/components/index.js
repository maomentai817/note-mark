// 将 components 文件夹下的所有组件进行全局化注册
import ActionButton from './modules/Button/ActionButton.vue'
import DelNoteButton from './modules/Button/DelNoteButton.vue'
import NewNoteButton from './modules/Button/NewNoteButton.vue'
import NotePreviewItem from './modules/NotePreviewItem.vue'

export const componentPlugin = {
  install(app) {
    app.component('ActionButton', ActionButton)
    app.component('DelNoteButton', DelNoteButton)
    app.component('NewNoteButton', NewNoteButton)
    app.component('NotePreviewItem', NotePreviewItem)
  }
}
