'use strict'

import mysql from 'mysql'

/**
 * mysql
 * @param {Object} options
 * @param {String} options.connectionLimit  连接数限制
 * @param {String} options.queueLimit       队列限制
 * @param {String} options.host             主机
 * @param {String} options.port             端口
 * @param {String} options.user             用户
 * @param {String} options.password         密码
 * @param {String} options.database         数据库名
 */
export default class Mysql {
  constructor(options = {}) {
    this.options = options
    // 是否是创建pool
    this.isPool = !!(options.connectionLimit || options.queueLimit != undefined)

    let o = {
      host: options.host,
      user: options.user,
      password: options.password,
    }

    if (options.database) {
      o.database = options.database
    }

    if (this.isPool) {
      o.connectionLimit = options.connectionLimit || 10
      o.queueLimit = options.queueLimit || 0
      this.connection = mysql.createPool(o)
    }
    else {
      this.connection = mysql.createConnection(o)
    }

    o = null
  }

  /**
   * 数据库连接
   */
  connect() {
    return new Promise((resolve, reject) => {
      this.connection[this.isPool ? 'getConnection' : 'connect'](async (err) => {
        if (err) {
          console.log(`connectError:${err}`)
          reject({ code: 500, data: '', msg: err.code })
        }

        if (this.options.database) {
          await this.use(this.options.database)
        }

        resolve({ code: 200, data: this.connection.threadId, msg: '数据库连接成功' })
      })
    })
  }

  /**
   * 数据库断连接
   */
  end() {
    return new Promise((resolve, reject) => {
      this.connection.end(err => {
        if (err) {
          console.log(`endError:${err}`)
          reject({ code: 500, data: '', msg: err.code })
        }
        resolve({ code: 200, data: '', msg: '数据库断连接成功' })
      })
    })
  }

  /**
   * 使用数据库
   * @param {String} database_name 数据库名
   */
  async use(database_name) {
    return await this.query(`USE ${database_name}`)
  }

  // #endregion

  /**
   * 执行sql语句
   * @param {String} sql   sql语句
   * @param {Array} values 值(?)
   */
  query(sql, values = []) {
    return new Promise((resolve, reject) => {
      if (this.options.debug) {
        console.log(sql)
      }
      this.connection.query(sql, values, (err, results, fields) => {
        if (err) {
          console.log(`queryError:${err}`)
          if (this.isTransaction) {
            this.connection.rollback(() => {
              reject({ code: 500, data: '', msg: err.code })
            })
          }
          reject({ code: 500, data: '', msg: err.code })
        }
        // if (this.isPool) {
        //   this.connection.release()
        // }
        resolve({ code: 200, data: results, msg: '' })
      })
    })
  }

  // #region 通用查询

  /**
   * 数据库列表
   * @returns
   * CATALOG_NAME:def',
   * SCHEMA_NAME:名称
   * DEFAULT_CHARACTER_SET_NAME:字符集
   * DEFAULT_COLLATION_NAME:字符集校对
   * SQL_PATH: null
   */
  async databases() {
    return await this.query('SELECT * FROM `information_schema`.`SCHEMATA`')
  }

  /**
   * 表列表
   * @param {String} database_name 数据库名
   * @returns
   * TABLE_CATALOG: 'def'
   * TABLE_SCHEMA:数据库名
   * TABLE_NAME: 表名
   * TABLE_TYPE: 'BASE TABLE'
   * ENGINE: 类型
   * VERSION: 10
   * ROW_FORMAT: 行格式
   * TABLE_ROWS: 记录计数
   * AVG_ROW_LENGTH: 0
   * DATA_LENGTH: 数据已用内存
   * MAX_DATA_LENGTH: 0
   * INDEX_LENGTH: 索引已用内存
   * DATA_FREE: 0
   * AUTO_INCREMENT: 自增
   * CREATE_TIME: 创建时间
   * UPDATE_TIME: 最近更新时间
   * CHECK_TIME: null
   * TABLE_COLLATION: 字符集校对
   * CHECKSUM: null
   * CREATE_OPTIONS: ''
   * TABLE_COMMENT: 表名备注
   */
  async tables(database_name) {
    database_name = database_name || this.options.database
    return await this.query('select * from information_schema.tables where table_schema=? and table_type=?', [database_name, 'base table'])
  }

  /**
   * 视图列表
   * @param {String} database_name 数据库名
   * @returns
   * TABLE_CATALOG: 'def'
   * TABLE_SCHEMA: 数据库名
   * TABLE_NAME: 视图名
   * VIEW_DEFINITION: 源代码
   * CHECK_OPTION: 'NONE'
   * IS_UPDATABLE: 'NO'
   * DEFINER: 'root@localhost' 定义
   * SECURITY_TYPE: 'INVOKER'
   * CHARACTER_SET_CLIENT: 'utf8' 字符集
   * COLLATION_CONNECTION: 'utf8_general_ci' 字符集校对
   */
  async views(database_name) {
    database_name = database_name || this.options.database
    return await this.query('select * from information_schema.views where table_schema=? ', [database_name])
  }

  /**
   * 触发器列表
   * @param {String} database_name 数据库名
   * @returns
   * TRIGGER_CATALOG: 'def'
   * TRIGGER_SCHEMA: 数据库名
   * TRIGGER_NAME: 触发器名
   * EVENT_MANIPULATION: 'INSERT'
   * EVENT_OBJECT_CATALOG: 'def'
   * EVENT_OBJECT_SCHEMA: 'sakila'
   * EVENT_OBJECT_TABLE: 'payment'
   * ACTION_ORDER: 1
   * ACTION_CONDITION: null
   * ACTION_STATEMENT: 'SET NEW.payment_date = NOW()'
   * ACTION_ORIENTATION: 'ROW'
   * ACTION_TIMING: 'BEFORE'
   * ACTION_REFERENCE_OLD_TABLE: null
   * ACTION_REFERENCE_NEW_TABLE: null
   * ACTION_REFERENCE_OLD_ROW: 'OLD'
   * ACTION_REFERENCE_NEW_ROW: 'NEW'
   * CREATED: 2018-11-25T02:21:19.820Z
   * SQL_MODE: 源代码
   * DEFINER: 'root@localhost'
   * CHARACTER_SET_CLIENT: 'utf8' 字符集
   * COLLATION_CONNECTION: 'utf8_general_ci' 字符集校对
   * DATABASE_COLLATION: 'utf8_general_ci'
   */
  async triggers(database_name) {
    database_name = database_name || this.options.database
    return await this.query('select * from information_schema.`TRIGGERS`where TRIGGER_SCHEMA=?', [database_name])
  }

  /**
   * 列列表
   * @param {String} table_name    表名
   * @param {String} database_name 数据库名
   * @returns
   * TABLE_CATALOG: 'def'
   * TABLE_SCHEMA: 数据库名
   * TABLE_NAME: 表名
   * COLUMN_NAME: 列名
   * ORDINAL_POSITION: 1
   * COLUMN_DEFAULT: null
   * IS_NULLABLE: 是否为空
   * DATA_TYPE: 类型
   * CHARACTER_MAXIMUM_LENGTH: 最大长度
   * CHARACTER_OCTET_LENGTH: null
   * NUMERIC_PRECISION: 10
   * NUMERIC_SCALE: 0
   * DATETIME_PRECISION: null
   * CHARACTER_SET_NAME: null
   * COLLATION_NAME: null
   * COLUMN_TYPE: 'int(11)'
   * COLUMN_KEY: 'PRI'
   * EXTRA: 'auto_increment'
   * PRIVILEGES: 'select,insert,update,references'
   * COLUMN_COMMENT: 列名备注
   * GENERATION_EXPRESSION: ''
   */
  async columns(table_name, database_name) {
    database_name = database_name || this.options.database
    return await this.query('select * from information_schema.columns where table_schema=? and table_name=?', [database_name, table_name])
  }

  // #endregion
}