'use strict'

const path = require('path')
const resolve = (dir) => path.join(__dirname, dir)

module.exports = {
  configureWebpack: {
    entry: './src/render/main.js'
  },
  chainWebpack: config => {
    // 修复HMR
    config.resolve.symlinks(true)

    // 修复Lazy loading routes Error： Cyclic dependency  [https://github.com/vuejs/vue-cli/issues/1669]
    config.plugin('html').tap(args => {
      args[0].chunksSortMode = 'none'
      return args
    })

    // 添加别名
    config.resolve.alias
      .set('@', resolve('src/render'))
      .set('@main', resolve('src/main'))
  },
  css: {
    extract: false,
    loaderOptions: {
      sass: {
        data: '@import "@/styles/variables.scss";'
      }
    }
  },
  pluginOptions: {
    electronBuilder: {
      chainWebpackRendererProcess: config => {
        // Chain webpack config for electron renderer process only
        // The following example will set IS_ELECTRON to true in your app
        config.plugin('define').tap(args => {
          args[0]['IS_ELECTRON'] = true
          return args
        })
      },
      mainProcessFile: 'src/main/index.js',
      builderOptions: {
        productName: 'stanhua',
        appId: 'stanhua.com',
        copyright: 'Copyright © 2019 stanhua.com',
        win: {
          icon: 'public/logo.ico',
          target: 'nsis'
        },
        // nsis: {
        //   oneClick: false, // 一键安装
        //   guid: 'xxxx', //注册表名字，不推荐修改
        //   perMachine: true, // 是否开启安装时权限限制（此电脑或当前用户）
        //   allowElevation: true, // 允许请求提升。 如果为false，则用户必须使用提升的权限重新启动安装程序。
        //   allowToChangeInstallationDirectory: true, // 允许修改安装目录
        //   installerIcon: './build/icons/aaa.ico', // 安装图标
        //   uninstallerIcon: './build/icons/bbb.ico', //卸载图标
        //   installerHeaderIcon: './build/icons/aaa.ico', // 安装时头部图标
        //   createDesktopShortcut: true, // 创建桌面图标
        //   createStartMenuShortcut: true, // 创建开始菜单图标
        //   shortcutName: 'xxxx' // 图标名称
        // }
      }
    }
  },

  devServer: {
    proxy: {
      '/api': {
        target: 'http://10.0.2.52:8085'
      }
    }
  }
}