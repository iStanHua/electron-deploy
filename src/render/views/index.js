import { remote } from 'electron'

import Loading from '@/components/common/loading/index.vue'
import Tree from '@/components/common/tree/index.vue'

import Resize from '@/directives/resize'

export default {
  name: 'HomePage',
  data() {
    return {
      mysql: null,
      filterDatabases: ['mysql', 'sys', 'information_schema', 'performance_schema'],
      currentDatabase: '',
      databaseList: [],

      treeList: [],
      loading: true,
      treeLoading: false
    }
  },
  directives: { Resize },
  computed: {
    host() {
      return this.$store.state.host || ''
    }
  },
  components: {
    Loading,
    Tree
  },
  created() {
    document.title = this.host
    this.fetchDatabaseList()
  },
  methods: {
    fetchDatabaseList() {
      this.mysql = remote.getGlobal('storage').mysql

      if (!this.mysql) {
        this.onLogout()
        return
      }

      this.mysql.databases().then(res => {
        if (res.code === 200) {
          this.databaseList = res.data.filter(row => this.filterDatabases.indexOf(row.SCHEMA_NAME) === -1).map(row => {
            return {
              name: row.SCHEMA_NAME
            }
          })
          setTimeout(() => {
            this.loading = false
          }, 500)
        }
      }).catch(err => {
        console.log(err)
      })
    },
    onHost() {
      this.currentDatabase = ''
      this.tableList = []
      this.columnList = []
    },
    onLogout() {
      this.$store.dispatch('logout')
    },
    // 选择数据库
    onSelectDatabase(val) {
      if (!this.mysql) {
        this.onLogout()
        return
      }

      this.treeLoading = true
      this.currentDatabase = val

      this.mysql.tables(val).then(res => {
        if (res.code === 200) {
          this.treeList = res.data.map(row => {
            let item = {
              name: row.TABLE_NAME,
              remark: row.TABLE_COMMENT,
              type: row.ENGINE,
              count: row.TABLE_ROWS,
              checked: true,
              level: 1,
              children: []
            }
            this.fetchColumns(item)
            return item
          })
          this.treeLoading = false
        }
      }).catch(err => {
        console.log(err)
      })
    },
    // 列列表
    fetchColumns(item) {
      this.mysql.columns(item.name, this.currentDatabase).then(res => {
        if (res.code === 200) {
          item.children = res.data.map(row => {
            return {
              name: row.COLUMN_NAME,
              remark: row.COLUMN_COMMENT,
              type: row.COLUMN_TYPE,
              dataType: row.DATA_TYPE,
              isNull: row.IS_NULLABLE === 'NO' ? 0 : 1,
              checked: true,
              level: 2
            }
          })
        }
      }).catch(err => {
        console.log(err)
      })
    },
    onCreate() {
      console.log(this.$refs.treeRef.getCheckedNodes())
    }
  }
}