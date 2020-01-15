'use strict'

import path from 'path'
import { Tray, Menu } from 'electron'

// 系统托盘
export default (app, win) => {
  // 系统托盘图标目录
  const tray = new Tray(path.join(path.join(process.cwd(), 'public'), 'logo.ico'))
  // 设置此托盘图标的悬停提示内容
  tray.setToolTip('ai')
  // 设置此图标的上下文菜单
  tray.setContextMenu(
    Menu.buildFromTemplate([
      {
        label: '打开',
        click: () => {
          win.show()
        }
      },
      {
        label: '退出',
        click: () => {
          app.quit()
        }
      }
    ]))

  tray.on('click', () => {
    win.isVisible() ? win.hide() : win.show()
  })

  // win.on('show', () => {
  //   tray.setHighlightMode('always')
  // })
  // win.on('hide', () => {
  //   tray.setHighlightMode('never')
  // })
  return tray
}
