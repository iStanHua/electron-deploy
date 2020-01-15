import Checkbox from '../checkbox/index.vue'

export default {
  name: 'TreeNode',
  props: {
    node: Object,
    level: {
      type: Number,
      default: 1
    },
    indent: Number,
    checkbox: Boolean
  },
  data() {
    return {
      isOpen: false,
      tree: null
    }
  },
  computed: {
    isFolder() {
      return this.node.children && this.node.children.length
    },
    currentLevel() {
      return this.level
    },
    currentIndent() {
      return this.indent + 6
    }
  },
  components: {
    Checkbox,
    NodeLabel: {
      props: {
        node: {
          required: true
        }
      },
      render(h) {
        const tree = this.$parent.tree

        return h('div', { class: 'tree-node_name' }, [
          tree.$scopedSlots.default ? tree.$scopedSlots.default(this.node) : this.node.name
        ])
      }
    }
  },
  created() {
    const parent = this.$parent
    if (parent.$options.name === 'Tree') {
      this.tree = parent
    } else {
      this.tree = parent.tree
    }
  },
  methods: {
    onToggle(node) {
      if (this.isFolder) {
        this.isOpen = !this.isOpen
      }
      node.isOpen = this.isOpen
      node.level = this.currentLevel

      this.tree.$emit('change', node)
    },
    onChange() {
      this.tree.$emit('checkbox-change', this.node)
    }
  }
}