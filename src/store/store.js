import Vue from 'vue'

export default class Store {
  constructor ({ state, getters, actions, mutations }) {
    this.state = Vue.observable(state || {})
    // this.getters = Vue.observable(getters || {});
    this.actions = Vue.observable(actions || {})
    this.mutations = Vue.observable(mutations || {})
    this.getters = {}
    Object.keys(getters).forEach(key => {
      Object.defineProperty(this.getters, key, {
        get: () => {
          return getters[key](this.state)
        }
      })
    })
  }

  commit = (fun, params) => { this.mutations[fun](this.state, params) };
  dispatch = (fun, params) => { this.actions[fun](this, params) };
  update = (key, value) => { this.state[key] = value };
}
