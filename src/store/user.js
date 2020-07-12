import api from '@/api';
import { getToken, setToken, removeToken, getInfo, setInfo, removeInfo } from '@/utils/auth'

const getDefaultState = () => {
  return {
    token: getToken(),
    userInfo: getInfo()
  }
}

const state = getDefaultState()

const getters = {
  // token: state => state.token,
  // userid: state => state.userInfo.userid
}

const mutations = {
  RESET_STATE: (state) => {
    Object.assign(state, getDefaultState())
  },
  SET_TOKEN: (state, token) => {
    state.token = token
  },
  SET_INFO: (state, info) => {
    state.userInfo = info
  }
}

const actions = {
  // 登陆
  login({ commit }, userInfo) {
    // console.log(this);
    return new Promise((resolve, reject) => {
      api.user.login(userInfo).then(response => {
        const { data } = response
        commit('SET_TOKEN', data.token)
        commit('SET_INFO', data)
        setToken(data.token)
        // localStorage.setItem('userInfo',JSON.stringify())
        setInfo(data)
        resolve()
      }).catch(error => {
        reject(error)
      })
    })
  },

  // 移除 token
  resetToken({ commit }) {
    return new Promise(resolve => {
      removeToken() // must remove  token  first
      removeInfo() // must remove  token  first
      commit('RESET_STATE')
      resolve()
    })
  },
  // get user info
  getInfo({ commit, state }) {
    return new Promise((resolve, reject) => {
      if (state.token && state.userInfo.userid) {
        api.user.getInfo({
          token: state.token,
          userid: state.userInfo.userid
        }).then(response => {
          const { data } = response
          if (!data) {
            return reject('验证失败，重新登陆.')
          }
          commit('SET_INFO', data)
          resolve(data)
        }).catch(error => {
          reject(error)
        })
      } else
        reject('未登陆')

    })
  },
}

export default {
  namespaced: true,
  state,
  getters,
  mutations,
  actions
}