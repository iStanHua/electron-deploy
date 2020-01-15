export default {
  name: 'Checkbox',
  model: {
    prop: 'checked',
    event: 'change'
  },
  props: {
    value: Number,
    label: String,
    checked: Boolean,
    disabled: Boolean
  },
  data() {
    return {
      isChecked: !!this.checked
    }
  },
  computed: {
  },
  created() {
  },
  methods: {
    onChange() {
      if (this.disabled) return
      this.isChecked = !this.isChecked
      if (this.$parent.$options.name === 'CheckboxGroup') {
        this.$parent.$emit('parent-change', { checked: this.isChecked, value: this.value == undefined ? this.label : this.value })
      }
      else {
        this.$emit('change', this.isChecked)
      }
    }
  },
  watch: {
    checked(v) {
      this.isChecked = v
    }
  },
}