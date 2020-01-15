'use strict'

import { ipcRenderer, remote } from 'electron'
import WinReg from 'winreg'

const RUN_LOCATION = '\\Software\\Microsoft\\Windows\\CurrentVersion\\Run'
const file = process.execPath

// 窗口最小化
export function minWindow() {
  remote.getCurrentWindow().minimize()
}

// 窗口最大化
export function maxWindow() {
  const win = remote.getCurrentWindow()
  if (win.isMaximized()) {
    win.restore()
  } else {
    win.maximize()
  }
}

// 设置窗口是否能改变大小，参数true/false
export function setResizable(resizable) {
  remote.getCurrentWindow().setResizable(resizable)
}

// 下载文件
export function download(url) {
  remote.getCurrentWebContents().downloadURL(url)
}

// 关闭窗口
export function closeWindow() {
  remote.getCurrentWindow().close()
}

// 隐藏窗口
export function hideWindow() {
  remote.getCurrentWindow().hide()
}

// 显示窗口
export function showWindow() {
  remote.getCurrentWindow().show()
}

// 窗口闪烁
export function flashFrame() {
  const win = remote.getCurrentWindow()
  //   if(win.isFocused() || win.isVisible())
  if (!win.isFocused()) {
    win.showInactive()
    win.flashFrame(true)
  }
}

// 设置窗口最前端显示
export function setAlwaysOnTop(top) {
  remote.getCurrentWindow().setAlwaysOnTop(top)
}

// 设置开机启动
export function enableAutoStart(callback) {
  let key = new WinReg({ hive: WinReg.HKCU, key: RUN_LOCATION })
  key.set('EUC', WinReg.REG_SZ, file, (err) => {
    if (err) {
      console.log('设置自动启动' + err)
      callback(err)
    }
  })
}

// 取消开机启动
export function disableAutoStart(callback) {
  let key = new WinReg({ hive: WinReg.HKCU, key: RUN_LOCATION });
  key.remove('EUC', (err) => {
    if (err) {
      console.log('取消自动启动' + err)
      callback(err)
    }
  })
}

// 获取是否开机启动
export function getAutoStartValue(callback) {
  let key = new WinReg({ hive: WinReg.HKCU, key: RUN_LOCATION })
  key.get('EUC', function (error, result) {
    console.log("查询自动启动:" + JSON.stringify(result))
    console.log("file:" + file)
    if (result) {
      callback(true)
    }
    else {
      callback(false)
    }
  });
}

/**
* 托盘图标闪烁
* @param flash true：闪烁；false：停止
*/
export function flashTray(flash) {
  let hasIcon = false
  const tayIcon = './imgs/logo.ico'
  const tayIcon1 = './imgs/empty.png'
  let flashTrayTimer = null
  if (flash) {
    if (flashTrayTimer) {
      return
    }
    flashTrayTimer = window.setInterval(() => {
      ipcRenderer.send('ChangeTrayIcon', hasIcon ? tayIcon : tayIcon1)
      hasIcon = !hasIcon
    }, 500)
  } else {
    if (flashTrayTimer) {
      window.clearInterval(flashTrayTimer)
      flashTrayTimer = null
    }
    ipcRenderer.send('ChangeTrayIcon', tayIcon)
  }
}