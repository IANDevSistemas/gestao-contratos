export const baseURL = "http://192.168.100.102:28080/bdoserver2.7/odwctrl"
// export const baseURL = `${window.location.origin}/bdoserver2.7/odwctrl`

export default {
  baseURL,
  method: "post",
  headers: {
    "Content-Type": "application/x-www-form-urlencoded; charset=utf-8"
  },
  withCredentials: true
}
