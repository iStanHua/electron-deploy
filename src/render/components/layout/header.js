import { ipcRenderer } from 'electron'

import Drag from '@/directives/drag'

export default {
  name: 'HeaderLayout',
  directives: { Drag },
  data() {
    return {
      isMaximize: false
    }
  },
  computed: {
    title() {
      return this.$route.meta.title
    },
    isMax() {
      return this.$route.meta.max
    }
  },
  created() {

  },
  mounted() {
  },
  methods: {
    // 最小化
    onMinimize() {
      ipcRenderer.send('ipc-min-window')
    },
    // 最大化
    onMaximize() {
      this.isMaximize = !this.isMaximize
      ipcRenderer.send('ipc-max-window', this.isMaximize)
    },
    // 关闭
    onClose() {
      ipcRenderer.send('ipc-close-window')
    }
  },
}
