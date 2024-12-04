import { dialog } from 'electron'
import { ensureDir, readFile, readdir, remove, stat, writeFile } from 'fs-extra'
import path from 'path'
import { isEmpty } from 'radash'
import welcomNote from '../../../resources/welcomeNote.md'

export const getRootDir = () => {
  return path.resolve(__dirname, '../../NoteMarks')
}

export const getNotes = async () => {
  const rootDir = getRootDir()

  await ensureDir(rootDir)

  const noteFileNames = await readdir(rootDir, {
    encoding: 'utf-8',
    withFileTypes: false
  })
  const notes = noteFileNames.filter((fileName) => fileName.endsWith('.md'))
  // todo: 空值判断
  if (isEmpty(notes)) {
    console.info('No notes found, creating a welcome note')

    const content = await readFile(welcomNote, { encoding: 'utf-8' })

    // todo: create the welcome note
    await writeFile(`${rootDir}/welcomeNote.md`, content, { encoding: 'utf-8' })
    notes.push('welcomeNote.md')
  }

  return Promise.all(notes.map(getNoteInfoFromFileName))
}

export const getNoteInfoFromFileName = async (fileName) => {
  const fileStats = await stat(`${getRootDir()}/${fileName}`)
  return {
    title: fileName.replace(/\.md$/, ''),
    lastEditTime: fileStats.mtimeMs
  }
}
