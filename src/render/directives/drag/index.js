import Vue from 'vue'

import Drag from './drag'

const install = (Vue) => {
  Vue.directive('Drag', Drag)
}

if (window.Vue) {
  window.drag = Drag
  Vue.use(install)
}

Drag.install = install

export default Drag
