import { throttle } from 'radash'
import { useNoteStore } from '@/stores'

export const useMarkdownEditor = () => {
  // auto save
  const noteStore = useNoteStore()

  const handleAutoSaving = throttle(
    async (content) => {
      if (!noteStore.selectedNote) return

      await noteStore.saveNote(content)
    },
    3000,
    {
      trailing: true,
      leading: false
    }
  )

  // blur 保存
  const handleBlur = async (content) => {
    if (!noteStore.selectedNote) return

    await noteStore.saveNote(content)
  }

  return {
    handleAutoSaving,
    handleBlur
  }
}
