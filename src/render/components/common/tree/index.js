import TreeNode from './node.vue'

export default {
  name: 'Tree',
  props: {
    data: Array,
    indent: {
      type: Number,
      default: 18
    },
    checkbox: Boolean
  },
  data() {
    return {
    }
  },
  computed: {
  },
  components: {
    TreeNode
  },
  mounted() {
    this.$on('change', (node) => {
      this.$emit('node-click', node)
    })
    this.$on('checkbox-change', (node) => {
      this.setCheckbox(node, node.checked)
    })
  },
  methods: {
    setCheckbox(node, checked) {
      if (node.children && node.children.length) {
        node.children = node.children.map(c => {
          this.$set(c, 'checked', checked)
          if (c.children && c.children.length) {
            this.setCheckbox(c, checked)
          }
          return c
        })
      }
    },
    getCheckedNodes() {
      let nodes = []
      this.checkedNodes(this.data, nodes)
      return nodes
    },
    checkedNodes(list, nodes = []) {
      list.forEach(l => {
        if (l.checked) {
          nodes.push(l)
        }
        else {
          if (l.children && l.children.length) {
            this.checkedNodes(l.children, nodes)
          }
        }
      })
    }
  }
}