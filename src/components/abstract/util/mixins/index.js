export const props = args => {
  const props = {}

  for (const arg in args) {
    props[arg] = (arg => ({
      default: () => args[arg]
    }))(arg)
  }

  return {
    props
  }
}

export const computed = args => {
  const computed = {}

  for (const arg in args) {
    computed[arg] = (arg => ({
      get: () => args[arg]
    }))(arg)
  }

  return {
    computed
  }
}

export default {
  props,
  computed
}
