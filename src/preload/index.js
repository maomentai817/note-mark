import { contextBridge } from 'electron'
import { electronAPI } from '@electron-toolkit/preload'

// 检查是否为上下文隔离运行环境
if (!process.contextIsolated) {
  throw new Error('必须在浏览器窗口配置中启用上下文隔离')
}
try {
  contextBridge.exposeInMainWorld('context', {
    // todo: 添加需要暴露给渲染进程的API
  })
} catch (error) {
  console.error(error)
}
