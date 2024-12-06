import { dialog } from 'electron'
import { ensureDir, readFile, readdir, remove, stat, writeFile } from 'fs-extra'
import path from 'path'
import { isEmpty } from 'radash'
import welcomNote from '../../../resources/welcomeNote.md?asset'
import { homedir } from 'os'

export const getRootDir = () => {
  // return path.resolve(__dirname, '../../NoteMarks')
  return `${homedir()}\\NoteMarks`
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

export const readNote = async (fileName) => {
  return readFile(`${getRootDir()}/${fileName}.md`, { encoding: 'utf-8' })
}

export const writeNote = async (fileName, content) => {
  return writeFile(`${getRootDir()}/${fileName}.md`, content, {
    encoding: 'utf-8'
  })
}

export const createNote = async () => {
  const rootDir = getRootDir()

  await ensureDir(rootDir)

  const { filePath, canceled } = await dialog.showSaveDialog({
    title: '创建新的笔记',
    defaultPath: rootDir,
    buttonLabel: '创建',
    properties: ['showOverwriteConfirmation'],
    showsTagField: false,
    filters: [{ name: 'Markdown files', extensions: ['md'] }]
  })

  if (canceled || !filePath) {
    console.info('User cancelled note creation')
    return false
  }

  const { name: fileName, dir: parentDir } = path.parse(filePath)

  if (parentDir !== rootDir) {
    await dialog.showMessageBox({
      type: 'error',
      title: 'Invalid file path',
      message: 'Please select a file in the root directory'
    })
    return false
  }

  await writeNote(fileName, '## welcome to NoteMark😘 -- mmt817🐱🐱')
  return fileName
}

export const deleteNote = async (fileName) => {
  const rootDir = getRootDir()

  const { response } = await dialog.showMessageBox({
    type: 'warning',
    title: '删除笔记',
    message: `确认删除 ${fileName}.md 吗?`,
    buttons: ['确认', '取消'],
    defaultId: 1,
    cancelId: 1
  })

  if (response === 1) {
    console.info('User cancelled note deletion')
    return false
  }

  await remove(`${rootDir}/${fileName}.md`)
  return true
}
