import { contextBridge, ipcRenderer } from 'electron'

// 检查是否为上下文隔离运行环境
if (!process.contextIsolated) {
  throw new Error('必须在浏览器窗口配置中启用上下文隔离')
}
try {
  contextBridge.exposeInMainWorld('context', {
    // todo: 添加需要暴露给渲染进程的API
    locale: navigator.language,
    getNotes: (...args) => ipcRenderer.invoke('getNotes', ...args),
    readNote: (...args) => ipcRenderer.invoke('readNote', ...args),
    writeNote: (...args) => ipcRenderer.invoke('writeNote', ...args),
    createNote: (...args) => ipcRenderer.invoke('createNote', ...args),
    deleteNote: (...args) => ipcRenderer.invoke('deleteNote', ...args),
    maximize: () => ipcRenderer.send('maximize'),
    unmaximize: () => ipcRenderer.send('unmaximize'),
    minimize: () => ipcRenderer.send('minimize'),
    restore: () => ipcRenderer.send('restore'),
    close: () => ipcRenderer.send('close'),
    reset: () => ipcRenderer.send('reset')
  })
} catch (error) {
  console.error(error)
}
