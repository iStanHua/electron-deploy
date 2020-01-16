import { ipcRenderer, remote } from 'electron'

import SSHClass from '@/utils/ssh'

export default {
  name: 'LoginPage',
  data() {
    return {
      formData: {
        // host: '127.0.0.1',
        host: '118.190.98.84',
        port: '22',
        user: 'root',
        password: '123456'
      },
      loading: false
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
      if (this.loading) return
      this.loading = true
      const ssh = new SSHClass(this.formData)
      ssh.connect().then((res) => {
        console.log(res)
        console.log(ssh)
        this.loading = false
        if (res.code === 200) {
          remote.getGlobal('storage').ssh = ssh.ssh
          this.$store.dispatch('setHost', this.formData.host)
          ipcRenderer.send('ipc-login', 'login')
          this.$router.replace('/index')
        }
      }).catch(err => {
        alert(err.msg ? err.msg : '处理异常')
        this.loading = false
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