import { format, setCursor } from "./utils"
import assign from "./assign"
import defaults from "./options"

export default { bind }

function bind(el, binding, vnode) {
  const opt = assign(defaults, binding.value)

  let target = el

  // v-money used on a component that's not a input
  if (el.tagName.toLocaleUpperCase() !== "INPUT") {
    const els = el.getElementsByTagName("input")
    if (els.length !== 1) {
      throw new Error(`v-money requires 1 input, found ${els.length}`)
    } else {
      [target] = els
    }
  }

  function eventListener(event) {
    if (!event.isTrusted) {
      return
    }
    run(target, opt)
    target.dispatchEvent(new Event(event.type))
  }

  target.addEventListener("input", eventListener)
  target.addEventListener("change", eventListener)

  // target.addEventListener("input", event => {
  //   console.log(event)
  // })

  target.addEventListener("focus", () => {
    setCursor(target, target.value.length - opt.suffix.length)
  })

  target.dispatchEvent(new Event("input"))
  // el.oninput()
  // el.dispatchEvent(event('input')) // force format after initialization
}

function run(target, opt) {
  let positionFromEnd = target.value.length - target.selectionEnd
  target.value = format(target.value, opt)
  positionFromEnd = Math.max(positionFromEnd, opt.suffix.length) // right
  positionFromEnd = target.value.length - positionFromEnd
  positionFromEnd = Math.max(positionFromEnd, opt.prefix.length + 1) // left
  setCursor(target, positionFromEnd)
}
