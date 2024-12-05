import { defineStore } from 'pinia'
import { ref } from 'vue'
import { unique, isEmpty } from 'radash'
// import { noteMock } from '../mocks'

export const useNoteStore = defineStore('note', () => {
  // state
  // 加载所有笔记
  const notes = ref([])
  const selectedNoteIndex = ref(0)
  // const selectedNote = computed(() => {
  //   if (isEmpty(notes.value)) return null
  //   return notes.value[selectedNoteIndex.value]
  // })
  const selectedNote = ref({})
  // actions
  // todo: select note
  const selectNote = async (index) => {
    selectedNoteIndex.value = index
    if (isEmpty(notes.value)) return
    selectedNote.value = notes.value[index]

    // 读取文件内容
    const content = await window.context.readNote(selectedNote.value.title)
    selectedNote.value = { ...selectedNote.value, content }
  }
  // todo: create new note
  const createNote = () => {
    notes.value.push({
      title: `New Note ${notes.value.length + 1}`,
      lastEditTime: new Date().getTime(),
      content: ''
    })
    notes.value = unique(notes.value, (note) => note.title)
    selectedNoteIndex.value = 0
  }
  // todo: delete note
  const deleteNote = () => {
    notes.value.splice(selectedNoteIndex.value, 1)
    selectedNoteIndex.value = 0
  }

  // todo: save markdown
  const saveNote = async (newContent) => {
    if (!selectedNote.value || !notes.value) return
    if (newContent === 'undefined') return

    // save on disk
    await window.context.writeNote(selectedNote.value.title, newContent)

    // update the saved note's last edit time
    notes.value[selectedNoteIndex.value].lastEditTime = new Date().getTime()
    selectedNote.value = {
      ...notes.value[selectedNoteIndex.value],
      content: newContent
    }
  }

  // ipc 加载所有笔记
  const loadNotes = async () => {
    const notes = await window.context.getNotes()

    return notes.sort((a, b) => b.lastEditTime - a.lastEditTime)
  }

  // todo: init()
  const init = async () => {
    notes.value = await loadNotes()
    selectedNoteIndex.value = 0
    selectNote(selectedNoteIndex.value)
  }

  init()
  // getters
  return {
    notes,
    selectedNote,
    selectedNoteIndex,
    selectNote,
    createNote,
    deleteNote,
    saveNote,
    init
  }
})
