
export default {
  bind(el, binding) {
    el.$isDown = false
    el.$mouseX = 0
    el.$resizeEl = el.querySelector('.' + (binding.value || 'sidebar-resize'))

    el.style.position = 'relative'

    if (!el.$resizeEl) {
      let $div = document.createElement('div')
      $div.className = binding.value || 'sidebar-resize'
      el.appendChild($div)

      el.$resizeEl = el.querySelector('.' + (binding.value || 'sidebar-resize'))
    }

    el.$mousedownEvent = (e) => {
      e.stopPropagation()
      e.preventDefault()
      el.$isDown = true
      el.$mouseX = e.x
      el.$screenWidth = document.body.clientWidth / 3
    }

    el.$mouseupEvent = () => {
      el.$isDown = false
    }

    el.$mousemoveEvent = (e) => {
      if (el.$isDown) {
        let pos = e.pageX

        // 边界处理
        if (pos > el.$screenWidth) {
          pos = el.$screenWidth
        }
        else if (pos <= 200) {
          pos = 200
        }
        el.style.width = pos + 'px'
      }
    }

    el.$resizeEl.addEventListener('mousedown', el.$mousedownEvent)
    window.addEventListener('mouseup', el.$mouseupEvent)
    window.addEventListener('mousemove', el.$mousemoveEvent)
  },
  unbind(el) {
    el.$resizeEl.removeEventListener('mousedown', el.$mousedownEvent)
    window.removeEventListener('mouseup', el.$mouseupEvent)
    window.removeEventListener('mousemove', el.$mousemoveEvent)

    delete el.$mouseX
    delete el.$isDown
    delete el.$screenWidth
    delete el.$resizeEl
    delete el.$mousedownEvent
    delete el.$mouseupEvent
    delete el.$mousemoveEvent
  }
}