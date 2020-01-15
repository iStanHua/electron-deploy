import { ipcRenderer, remote } from 'electron'

import MySql from '@/utils/mysql'

export default {
  name: 'LoginPage',
  data() {
    return {
      formData: {
        host: '127.0.0.1',
        port: '3306',
        user: 'root',
        password: '123456'
      }
    }
  },
  computed: {

  },
  components: {
  },
  created() {
    document.addEventListener('keydown', this.onKeydown)
  },
  methods: {
    onLogin() {
      const mysql = new MySql(this.formData)
      mysql.connect().then(() => {
        this.$store.dispatch('setHost', this.formData.host)

        this.$router.replace('/index')
        remote.getGlobal('storage').mysql = mysql
        ipcRenderer.send('ipc-login', 'login')
      }).catch(err => {
        alert(err.msg ? err.msg : '处理异常')
        console.log(err)
      })
    },
    onKeydown(e) {
      if (e.keyCode === 13) {
        this.onLogin()
      }
    }
  }
}