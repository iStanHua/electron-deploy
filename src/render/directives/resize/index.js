import Vue from 'vue'

import Resize from './resize'

const install = (Vue) => {
  Vue.directive('Resize', Resize)
}

if (window.Vue) {
  window.resize = Resize
  Vue.use(install)
}

Resize.install = install

export default Resize
