import defaults from "./options"

function format(input = 0, opt = defaults) {
  const value = typeof input === "number" ? input.toFixed(fixed(opt.precision)) : input

  const negative = value.indexOf("-") !== -1 && value.indexOf("+") === -1 ? "-" : ""

  const numbers = onlyNumbers(value)
  const currency = numbersToCurrency(numbers, opt.precision)
  const parts = toStr(currency).split(".")
  const [integerDirty, decimal] = parts
  const integer = addThousandSeparator(integerDirty, opt.thousands)
  return opt.prefix + negative + joinIntegerAndDecimal(integer, decimal, opt.decimal) + opt.suffix
}

function unformat(input, precision) {
  const negative = input.indexOf("-") >= 0 ? -1 : 1
  const numbers = onlyNumbers(input)
  const currency = numbersToCurrency(numbers, precision)
  return parseFloat(currency) * negative
}

function onlyNumbers(input) {
  return toStr(input).replace(/\D+/g, "") || "0"
}

// Uncaught RangeError: toFixed() digits argument must be between 0 and 20 at Number.toFixed
function fixed(precision) {
  return between(0, precision, 20)
}

function between(min, n, max) {
  return Math.max(min, Math.min(n, max))
}

function numbersToCurrency(numbers, precision) {
  const exp = Math.pow(10, precision)
  const float = parseFloat(numbers) / exp
  return float.toFixed(fixed(precision))
}

function addThousandSeparator(integer, separator) {
  return integer.replace(/(\d)(?=(?:\d{3})+\b)/gm, `$1${separator}`)
}

// function currencyToIntegerAndDecimal(float) {
//   return toStr(float).split(".")
// }

function joinIntegerAndDecimal(integer, decimal, separator) {
  return decimal ? integer + separator + decimal : integer
}

function toStr(value) {
  return value ? value.toString() : ""
}

function setCursor(el, position) {
  function setSelectionRange() {
    el.setSelectionRange(position, position)
  }
  if (el === document.activeElement) {
    setSelectionRange()
    setTimeout(setSelectionRange, 1) // Android Fix
  }
}

// // https://developer.mozilla.org/en-US/docs/Web/Guide/Events/Creating_and_triggering_events#The_old-fashioned_way
// function event(name) {
//   const evt = document.createEvent("Event")
//   evt.initEvent(name, true, true)
//   return evt
// }

export { format, unformat, setCursor }
