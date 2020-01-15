import { remote } from 'electron'

export default {
  bind(el) {
    el.$isDown = false
    el.$mouseX = 0
    el.$mouseY = 0
    el.$win = remote.getCurrentWindow()

    el.$mousedownEvent = (e) => {
      e.preventDefault()
      el.$isDown = true
      el.$mouseX = e.x
      el.$mouseY = e.y
    }

    el.$mouseupEvent = () => {
      el.$isDown = false
    }

    el.$mousemoveEvent = (e) => {
      if (el.$isDown) {
        const { pageX, pageY } = e
        const pos = el.$win.getPosition()
        pos[0] = pos[0] + pageX - el.$mouseX
        pos[1] = pos[1] + pageY - el.$mouseY
        el.$win.setPosition(pos[0], pos[1], true)
      }
    }

    el.addEventListener('mousedown', el.$mousedownEvent)
    window.addEventListener('mouseup', el.$mouseupEvent)
    window.addEventListener('mousemove', el.$mousemoveEvent)
  },
  unbind(el) {
    el.removeEventListener('mousedown', el.$mousedownEvent)
    window.removeEventListener('mouseup', el.$mouseupEvent)
    window.removeEventListener('mousemove', el.$mousemoveEvent)

    delete el.$mouseX
    delete el.$mouseY
    delete el.$isDown
    delete el.$win
    delete el.$mousedownEvent
    delete el.$mouseupEvent
    delete el.$mousemoveEvent
  }
}