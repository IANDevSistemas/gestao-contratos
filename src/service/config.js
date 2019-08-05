/* global DEV */
export const baseURL = `${DEV ? "http://192.168.197.102:28080" : window.location.origin}/bdoserver2.7/odwctrl`
// export const baseURL = "http://server1iandev.no-ip.org:28081/bdoserver2.7/odwctrl"

// http://server1iandev.no-ip.org:28081

export default {
  baseURL,
  method: "post",
  headers: {
    "Content-Type": "application/x-www-form-urlencoded; charset=utf-8"
  },
  withCredentials: true
}
