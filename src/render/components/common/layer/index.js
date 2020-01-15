export default {
  name: 'Layer',
	/*
	* data.flag  {Boolean}      是否是tips
	* data.title {String}
	* data.tips  {String}       提示内容
	* data.btns  {String}       按钮长度
	* data.disabled  {Boolean}  提交时按钮是否禁止
	* data.maskClose {Boolean}  点击遮罩层关闭
	*/
  props: {
    // 是否显示
    show: Boolean,
    // 是否插入至 body 元素
    appendToBody: {
      type: Boolean,
      default: true
    },
    // 点击遮罩层关闭
    maskClose: {
      type: Boolean,
      default: false
    },
    // 是否为全屏
    fullscreen: Boolean,
    // 宽度
    width: String,
    // 标题
    title: String,
    // 是否显示关闭图标
    showClose: {
      type: Boolean,
      default: true
    },
    // 动画名称
    animate: {
      type: String,
      default: 'fade'
    }
  },
  data() {
    return {
      zIndex: 1000
    }
  },
  computed: {
    style() {
      if (this.width) {
        return { width: this.width }
      }
      return {}
    }
  },
  mounted() {
    if (this.show) {
      if (this.appendToBody) {
        document.body.appendChild(this.$el)
      }
    }
  },
  destroyed() {
    if (this.appendToBody && this.$el && this.$el.parentNode) {
      delete this.$el.parentNode.layerIndex
      this.$el.parentNode.removeChild(this.$el)
    }
  },
  methods: {
    clickLayer() {
      if (this.maskClose) {
        this.closeLayer()
      }
    },
    closeLayer() {
      this.$emit('update:show', false)
    },
    afterEnter() {
      this.$emit('opened')
    },
    afterLeave() {
      this.$emit('closed')
    }
  },
  watch: {
    show(val) {
      if (val) {
        this.$emit('open')

        if (this.$el.parentNode) {
          if (this.$el.parentNode.layerIndex) {
            this.zIndex = this.$el.parentNode.layerIndex++
          }
          else {
            this.$el.parentNode.layerIndex = this.zIndex
          }
        }

        if (this.appendToBody) {
          document.body.appendChild(this.$el)
        }

      }
      else {
        this.$emit('close')
      }
    }
  }
}