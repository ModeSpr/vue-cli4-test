import Store from './store'
import storage from '@/utils/storage'
// import user from "@/api/user";

const infoKey = 'info'
const getDefaultState = () => {
  return {
    token: storage.getToken() || '', // 存储token
    userInfo: storage.getItem(infoKey) || {}
  }
}

var state = getDefaultState()
var getters = {
  hasToken (state) {
    return Boolean(state.token)
  }
}
var mutations = {
  // 重置
  RESET_STATE: (state) => {
    Object.assign(state, getDefaultState())
  },
  // 修改token，并将token存入
  setToken (state, token) {
    state.token = token
    storage.setToken(token)
  },
  setInfo (state, info) {
    state.info = info
    storage.setItem(infoKey, info)
  }
}
var actions = {
  // 移除
  reset ({ commit }) {
    return new Promise(resolve => {
      storage.clear() // must remove  token  first
      commit('RESET_STATE')
      resolve()
    })
  },
  // 获取用户信息
  // getInfo({ commit, state }) {
  //   if (state.token) {
  //     user.getInfo().then(res => {
  //       if (res.data.error_code == 0) {
  //         commit('setUserInfo', res.data.data)
  //       } else Message.error(res.data.error_code);
  //     })
  //   }
  // },
  login ({ commit }, info) {
    commit('setToken', info.token)
    commit('setInfo', info)
  }
}

const store = new Store({
  state,
  getters,
  actions,
  mutations
})

export default store
