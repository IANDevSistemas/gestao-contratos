import defaultsDeep from "lodash/defaultsDeep"
import router from "router"
import service from "service"

export default (apelido, prefix) => {
  const params = {
    action: "execFunction",
    apelido: !prefix ? `GESTAOCONTRATOS-service-${apelido}` : `${prefix}-${apelido}`
  }

  function transformResponse(data) {
    try {
      return JSON.parse(data)
    } catch (error) {
      router.push({ name: "logout" })
      return error
    }
  }

  function defaults(config) {
    return defaultsDeep({}, { params, transformResponse }, config)
  }

  return {
    request(config) {
      return service.request(defaults(config))
    },
    get(config) {
      return service.get("", defaults(config))
    },
    delete(config) {
      return service.delete("", defaults(config))
    },
    head(config) {
      return service.head("", defaults(config))
    },
    options(config) {
      return service.options("", defaults(config))
    },
    post(data, config) {
      return service.post("", data, defaults(config))
    },
    put(data, config) {
      return service.put("", data, defaults(config))
    },
    patch(data, config) {
      return service.patch("", data, defaults(config))
    },
    search(search, done) {
      const paramsDefaults = {
        params
      }

      const paramsSearch = {
        params: {
          search
        }
      }

      const config = defaultsDeep({}, paramsDefaults, paramsSearch)

      const promisse = service.get("", defaults(config))

      promisse
        .then(({ data }) => {
          done(data)
        })
        .catch(error => {
          console.error(error)
          done([])
        })
    }
  }
}
