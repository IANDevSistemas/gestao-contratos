import axios from "axios"
import qs from "qs"

const service = axios.create({
  method: "post",
  baseURL: "http://192.168.100.102:28080/bdoserver2.7/odwctrl",
  headers: {
    "Content-Type": "application/x-www-form-urlencoded; charset=utf-8"
  },
  withCredentials: true
})

service.interceptors.request.use((request) => {
  if (request.data && request.headers["Content-Type"] === "application/x-www-form-urlencoded; charset=utf-8") {
    request.data = qs.stringify(request.data)
  }
  return request
})

export default service
