import { app, shell, BrowserWindow, ipcMain, nativeTheme } from 'electron'
import { join } from 'path'
import { electronApp, optimizer, is } from '@electron-toolkit/utils'
import icon from '../../resources/icon.png?asset'
import { getNotes, readNote, writeNote, createNote, deleteNote } from './lib'

function createWindow() {
  // Create the browser window.
  const mainWindow = new BrowserWindow({
    width: 900,
    height: 670,
    minWidth: 900,
    minHeight: 670,
    show: false,
    autoHideMenuBar: true,
    backgroundMaterial: 'acrylic',
    titleBarStyle: 'hidden',
    center: true,
    // win11 设置 backgroundMaterial 后, 最大化将失去圆角且背景变黑, 暂无解决, 禁用最大化
    maximizable: false,
    title: 'NoteMark',
    ...(process.platform === 'linux' ? { icon } : {}),
    webPreferences: {
      preload: join(__dirname, '../preload/index.js'),
      // 增强程序 SEC 安全性
      // 1. 启用沙盒环境, 隔离渲染进程(前端), 仅可通过进程间通讯(IPC)委派任务给主进程;
      // 限制 Nodejs API 访问, 如文件系统操作, 网络请求等只能通过 preload 预加载脚本与主进程交互
      sandbox: true,
      // 2. 启用上下文隔离, 避免主进程与渲染进程间数据共享, 仅可通过 preload 的 export 导出方法进行通信
      contextIsolation: true
    },
    frame: false
  })

  mainWindow.on('ready-to-show', () => {
    mainWindow.show()
    nativeTheme.themeSource = 'dark'
  })
  // 暂时性解决, 用户体验差
  mainWindow.on('blur', () => {
    // mainWindow.focus() // 强制重新聚焦窗口
  })

  mainWindow.webContents.setWindowOpenHandler((details) => {
    shell.openExternal(details.url)
    return { action: 'deny' }
  })

  // HMR for renderer base on electron-vite cli.
  // Load the remote URL for development or the local html file for production.
  if (is.dev && process.env['ELECTRON_RENDERER_URL']) {
    mainWindow.loadURL(process.env['ELECTRON_RENDERER_URL'])
  } else {
    mainWindow.loadFile(join(__dirname, '../renderer/index.html'))
  }
}

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.whenReady().then(() => {
  // Set app user model id for windows
  electronApp.setAppUserModelId('com.electron')

  // Default open or close DevTools by F12 in development
  // and ignore CommandOrControl + R in production.
  // see https://github.com/alex8088/electron-toolkit/tree/master/packages/utils
  app.on('browser-window-created', (_, window) => {
    optimizer.watchWindowShortcuts(window)
  })

  // IPC test
  ipcMain.on('ping', () => console.log('pong'))

  // 窗口操作相关
  ipcMain.on('maximize', (event) => {
    const win = BrowserWindow.fromWebContents(event.sender)
    if (win) win.maximize()
  })

  ipcMain.on('unmaximize', (event) => {
    const win = BrowserWindow.fromWebContents(event.sender)
    if (win) win.unmaximize()
  })

  ipcMain.on('minimize', (event) => {
    const win = BrowserWindow.fromWebContents(event.sender)
    if (win) win.minimize()
  })

  ipcMain.on('restore', (event) => {
    const win = BrowserWindow.fromWebContents(event.sender)
    if (win) win.restore()
  })

  ipcMain.on('close', (event) => {
    const win = BrowserWindow.fromWebContents(event.sender)
    if (win) win.close()
  })

  ipcMain.on('reset', (event) => {
    const win = BrowserWindow.fromWebContents(event.sender)
    if (win) {
      win.unmaximize()
      win.setBounds({ x: 100, y: 100, width: 900, height: 670 }) // 恢复到初始位置和大小
    }
  })

  // note 列表 ipc 注册
  ipcMain.handle('getNotes', (_, ...args) => getNotes(...args))
  ipcMain.handle('readNote', (_, ...args) => readNote(...args))
  ipcMain.handle('writeNote', (_, ...args) => writeNote(...args))
  ipcMain.handle('createNote', (_, ...args) => createNote(...args))
  ipcMain.handle('deleteNote', (_, ...args) => deleteNote(...args))

  createWindow()

  app.on('activate', function () {
    // On macOS it's common to re-create a window in the app when the
    // dock icon is clicked and there are no other windows open.
    if (BrowserWindow.getAllWindows().length === 0) createWindow()
  })
})

// Quit when all windows are closed, except on macOS. There, it's common
// for applications and their menu bar to stay active until the user quits
// explicitly with Cmd + Q.
app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit()
  }
})

// In this file you can include the rest of your app"s specific main process
// code. You can also put them in separate files and require them here.
