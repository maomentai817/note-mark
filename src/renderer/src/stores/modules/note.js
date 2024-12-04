import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import { unique, isEmpty } from 'radash'
// import { noteMock } from '../mocks'

export const useNoteStore = defineStore('note', () => {
  // state
  // 加载所有笔记
  const notes = ref()
  const selectedNoteIndex = ref(0)
  const selectedNote = computed(() => {
    if (isEmpty(notes.value)) return null
    return notes.value[selectedNoteIndex.value]
  })
  // actions
  // todo: select note
  const selectNote = (index) => {
    selectedNoteIndex.value = index
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
    console.log(notes.value)
  }
  // todo: delete note
  const deleteNote = () => {
    notes.value.splice(selectedNoteIndex.value, 1)
    selectedNoteIndex.value = 0
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
    selectedNote.value = notes.value[selectedNoteIndex.value]
  }
  // getters
  return {
    notes,
    selectedNote,
    selectedNoteIndex,
    selectNote,
    createNote,
    deleteNote,
    init
  }
})
