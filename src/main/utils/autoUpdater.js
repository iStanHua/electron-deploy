'use strict'
import { autoUpdater } from 'electron-updater'

// 系统托盘
export default (win) => {
  /**
   * 发送自动更新相关状态
   * @param {*} text 更新描述
   */
  function sendAutoUpdateStatus(text) {
    win.webContents.send('autoUpdateStatus', text)
  }

  autoUpdater.on('checking-for-update', () => {
    sendAutoUpdateStatus('正在检查更新...')
  })

  autoUpdater.on('update-available', info => {
    sendAutoUpdateStatus(`发现新版本（${info.version}）～，开始下载...`)
  })

  autoUpdater.on('update-not-available', info => {
    sendAutoUpdateStatus('已经是最新版本~')
  })

  autoUpdater.on('error', info => {
    sendAutoUpdateStatus(`更新出错：${info}`)
  })

  autoUpdater.on('download-progress', (progressInfo) => {
    let speed = progressInfo.bytesPerSecond
    speed = speed.toString().length > 6 ? `${parseFloat((speed / 1024 / 1024)).toFixed(2)}mb/s` : `${(speed / 1024).toFixed(2)}kb/s`
    sendAutoUpdateStatus(`已下载${Math.ceil(progressInfo.percent)}%（${speed}）`)
  })

  autoUpdater.on('update-downloaded', info => {
    sendAutoUpdateStatus('下载完成，准备安装...')
    autoUpdater.quitAndInstall()
  })

  return autoUpdater
}