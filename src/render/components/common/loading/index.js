export default {
  name: 'Loading',
  props: {
    show: {
      type: Boolean,
      default: true
    }
  },
  data() {
    return {
    }
  },
  computed: {
  },
  mounted() {
    setTimeout(() => {
      this.$emit('update:show', false)
    }, 3000)
  },
  methods: {

  }
}