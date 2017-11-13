import defaultsDeep from "lodash/defaultsDeep"
import service from "service"
export default (apelido, prefix) => {
  const params = {
    action: "execFunction",
    apelido: !prefix ? `GESTAOCONTRATO-service-${apelido}` : `${prefix}-${apelido}`
  }
  return {
    request(config) {
      return service.request(defaultsDeep({ params }, config))
    },
    get(config) {
      return service.request(defaultsDeep({ params }, config))
    },
    delete(config) {
      return service.request(defaultsDeep({ params }, config))
    },
    head(config) {
      return service.request(defaultsDeep({ params }, config))
    },
    options(config) {
      return service.request(defaultsDeep({ params }, config))
    },
    post(data, config) {
      return service.post(data, defaultsDeep({ params }, config))
    },
    put(data, config) {
      return service.put(data, defaultsDeep({ params }, config))
    },
    patch(data, config) {
      return service.patch(data, defaultsDeep({ params }, config))
    }
  }
}
