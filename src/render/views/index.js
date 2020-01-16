import { remote } from 'electron'

export default {
  name: 'HomePage',
  data() {
    return {
      ssh: null,
      currentIndex: 0
    }
  },
  computed: {
    hostList() {
      return this.$store.state.hostList || []
    }
  },
  components: {},
  created() {
    // document.title = this.hostList[this.currentIndex]

    this.ssh = remote.getGlobal('storage').ssh

  },
  methods: {
    onCreate() {
      const resolved = this.$router.resolve({
        path: '/login'
      })
      window.open(resolved.href, '_blank')
    },
    onLogout() {
      this.ssh && this.ssh.dispose()
      this.$store.dispatch('logout')
    },
    execLs() {
      if (this.ssh) {
        this.ssh.execCommand('ls', { cwd: '/var/www' }).then(function (result) {
          console.log('STDOUT: ' + result.stdout)
          console.log('STDERR: ' + result.stderr)
        })
      }
    }
  }
}