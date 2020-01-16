'use strict'

import path from 'path'
import { app, protocol, BrowserWindow, ipcMain, globalShortcut } from 'electron'
import { createProtocol } from 'vue-cli-plugin-electron-builder/lib'

import Tray from './utils/tray'

// storage
global.storage = {}

const isDevelopment = process.env.NODE_ENV !== 'production'

// Keep a global reference of the window object, if you don't, the window will
// be closed automatically when the JavaScript object is garbage collected.
let mainWindow

// Scheme must be registered before the app is ready
protocol.registerSchemesAsPrivileged([{
  scheme: 'app',
  privileges: {
    secure: true,
    standard: true
  }
}])

// Create the browser window.
function createMainWindow() {
  mainWindow = new BrowserWindow({
    width: 1000,
    height: 680,
    autoHideMenuBar: true,
    center: true,
    frame: false,
    show: false,
    resizable: false,
    webPreferences: {
      webSecurity: false,
      nodeIntegration: true
    }
  })

  // // 点击穿透窗口
  // mainWindow.setIgnoreMouseEvents(true)

  if (process.env.WEBPACK_DEV_SERVER_URL) {
    // Load the url of the dev server if in development mode
    mainWindow.loadURL(process.env.WEBPACK_DEV_SERVER_URL)
    if (!process.env.IS_TEST) mainWindow.webContents.openDevTools()
  } else {
    createProtocol('app')
    // Load the index.html when not in development
    mainWindow.loadURL('app://./index.html')
  }

  mainWindow.on('closed', () => {
    mainWindow = null
  })

  mainWindow.on('app-command', (e, cmd) => {
    // 当用户点击鼠标返回按钮时，导航窗口会后退
    if (cmd === 'browser-backward' && mainWindow.webContents.canGoBack()) {
      mainWindow.webContents.goBack()
    }
  })

  // 显示窗口将没有视觉闪烁
  mainWindow.once('ready-to-show', () => {
    mainWindow.show()
  })

  mainWindow.once('focus', () => mainWindow.flashFrame(false))
  mainWindow.flashFrame(true)
  mainWindow.setMenu(null)

  // 设置菜单栏
  // if (process.platform === 'darwin') {
  //   Menu.setApplicationMenu(Menu.buildFromTemplate([
  //     { label: 'AI', submenu: [{ role: 'about' }, { role: 'quit' }] }
  //   ]))
  // }
  // else {
  //   Menu.setApplicationMenu(null)
  // }

  // 系统托盘
  Tray(app, mainWindow)

  // // 确保应用只有一个实例
  // const isSecondInstance = app.makeSingleInstance(() => {
  //   if (mainWindow) {
  //     if (mainWindow.isMinimized()) mainWindow.restore()
  //     mainWindow.focus()
  //   }
  // })

  // if (isSecondInstance) {
  //   app.quit()
  // }
}

// Exit cleanly on request from parent process in development mode.
if (isDevelopment) {
  if (process.platform === 'win32') {
    process.on('message', data => {
      if (data === 'graceful-exit') {
        app.quit()
      }
    })
  } else {
    process.on('SIGTERM', () => {
      app.quit()
    })
  }
}

// #region app event

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.on('ready', async () => {
  if (isDevelopment && !process.env.IS_TEST) {
    // Install Vue Devtools
    try {
      BrowserWindow.addDevToolsExtension(path.resolve(process.cwd(), 'vue-devtools'))
    } catch (e) {
      console.error('Vue Devtools failed to install:', e.toString())
    }

    // 在开发环境和生产环境均可通过快捷键打开devTools
    globalShortcut.register('CommandOrControl+Shift+I', function () {
      mainWindow.webContents.isDevToolsOpened() ? mainWindow.webContents.closeDevTools() : mainWindow.webContents.openDevTools()
    })
  }
  createMainWindow()
})

app.on('activate', () => {
  // On macOS it's common to re-create a window in the app when the
  // dock icon is clicked and there are no other windows open.
  if (mainWindow === null) {
    createMainWindow()
  }
})

// Quit when all windows are closed.
app.on('window-all-closed', () => {
  // On macOS it is common for applications and their menu bar
  // to stay active until the user quits explicitly with Cmd + Q
  if (process.platform !== 'darwin') {
    app.quit()
  }
})

app.on('will-quit', () => {
  if (isDevelopment && !process.env.IS_TEST) {
    // 注销快捷键
    globalShortcut.unregister('CommandOrControl+Shift+I')
  }

  // 注销所有快捷键
  // globalShortcut.unregisterAll()
})
// #endregion

// #region ipcMain

// 最小化窗口
ipcMain.on('ipc-min-window', () => {
  mainWindow.minimize()
})

// 最大化窗口
ipcMain.on('ipc-max-window', (e, arg) => {
  if (!arg) {
    mainWindow.unmaximize()
  } else {
    mainWindow.maximize()
  }
})

// 关闭窗口
ipcMain.on('ipc-close-window', () => {
  app.quit()
})

// 在线/离线事件探测
ipcMain.on('online-status-changed', (e, status) => {
  console.log(e, status)
})

// 登录或退出成功
ipcMain.on('ipc-login', (e, arg) => {
  mainWindow.center()
})

// #endregion