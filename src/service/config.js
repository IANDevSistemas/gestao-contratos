export const baseURL = "http://192.168.100.102:28080/bdoserver2.7/odwctrl"

export default {
  method: "post",
  baseURL,
  headers: {
    "Content-Type": "application/x-www-form-urlencoded; charset=utf-8"
  },
  withCredentials: true
}
