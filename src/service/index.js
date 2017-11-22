import axios from "axios"
import config from "./config"
import qs from "qs"


const service = axios.create(config)

service.interceptors.request.use(request => {
  if (request.data && request.headers["Content-Type"] === "application/x-www-form-urlencoded; charset=utf-8") {
    request.data = qs.stringify(request.data)
  }
  return request
})

export default service
