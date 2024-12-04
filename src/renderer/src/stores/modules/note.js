import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import { unique } from 'radash'
import { noteMock } from '../mocks'

export const useNoteStore = defineStore('note', () => {
  // state
  // 加载所有笔记
  const notes = ref(noteMock)
  const selectedNoteIndex = ref(0)
  const selectedNote = computed(() => {
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
  // getters
  return {
    notes,
    selectedNote,
    selectedNoteIndex,
    selectNote,
    createNote,
    deleteNote
  }
})
