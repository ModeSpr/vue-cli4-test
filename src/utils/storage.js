const tokenKey = 'token'

export function getToken () {
  return sessionStorage.getItem(tokenKey)
}
export function setToken (token) {
  return sessionStorage.setItem(tokenKey, token)
}
export function removeToken () {
  return sessionStorage.removeItem(tokenKey)
}

export function getItem (key) {
  return JSON.parse(sessionStorage.getItem(key))
}
export function setItem (key, item) {
  return sessionStorage.setItem(key, JSON.stringify(item))
}
export function removeItem (key) {
  return sessionStorage.removeItem(key)
}
export function clear () {
  return sessionStorage.clear()
}

export default {
  getItem, setItem, removeItem, clear, getToken, setToken, removeToken
}
