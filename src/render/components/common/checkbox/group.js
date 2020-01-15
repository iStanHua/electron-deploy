export default {
  name: 'CheckboxGroup',
  model: {
    prop: 'value',
    event: 'change'
  },
  props: {
    value: Array,
    disabled: Boolean
  },
  data() {
    return {}
  },
  computed: {},
  mounted() {
    this.$nextTick(() => {
      this.$children.forEach(c => {
        if (c.$options.name === 'Checkbox') {
          if (this.disabled) {
            c.isDisabled = true
          }
          if (c.value && this.value.includes(c.value)) {
            c.isChecked = true
          }
          else if (this.value.includes(c.label)) {
            c.isChecked = true
          }
        }
      })

      this.$on('parent-change', (res) => {
        let oldValue = this.value
        if (res.checked) {
          oldValue.push(res.value)
        }
        else {
          oldValue.splice(oldValue.indexOf(res.value), 1)
        }
        this.$emit('change', oldValue)
        oldValue = null
      })
    })
  },
  methods: {
  }
}