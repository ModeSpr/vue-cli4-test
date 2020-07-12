const TokenKey = 'Authorization'
const UserKey = 'userInfo'

export function getToken() {
  return localStorage.getItem(TokenKey)
}

export function setToken(params) {
  return localStorage.setItem(TokenKey,params)
}

export function removeToken() {
  return localStorage.removeItem(TokenKey)
}


export function getInfo() {
  return JSON.parse(localStorage.getItem(UserKey))
}
export function setInfo(params) {
  return localStorage.setItem(UserKey,JSON.stringify(params))
}
export function removeInfo() {
  return localStorage.removeItem(UserKey)
}