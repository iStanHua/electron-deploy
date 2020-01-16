'use strict'

import node_ssh from 'node-ssh'

/**
 * ssh
 * @param {Object} options
 * @param {String} options.host         主机
 * @param {String} options.port         端口
 * @param {String} options.user         用户
 * @param {String} options.password     密码
 */
export default class SSHClass {
  constructor(options = {}) {
    options.port = options.port || 22
    this.options = options
    this.ssh = new node_ssh(this.options)
  }

  /**
   * 服务器连接
   */
  connect() {
    return new Promise((resolve, reject) => {
      this.ssh.connect(this.options).then(() => {
        resolve({ code: 200, data: '', msg: '连接服务器成功' })
      }).catch(err => {
        console.log('SSH连接失败:', err)
        reject({ code: 500, data: '', msg: err })
      })
    })
  }
}