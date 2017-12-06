export default function (defaults = {}, extras = {}) {
  return Object.keys(defaults)
    .concat(Object.keys(extras))
    .reduce((acc, val) => {
      acc[val] = extras[val] === void 0 ? defaults[val] : extras[val]
      return acc
    }, {})
}
