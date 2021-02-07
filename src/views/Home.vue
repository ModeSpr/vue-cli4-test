<template>
  <div class="home">
    <img alt="Vue logo" src="../assets/logo.png" />
    <Demo />
  </div>
</template>

<script>
// @ is an alias to /src
import Vue from 'vue'
const state = Vue.observable({ count: 0 })

const Demo = {
  render(h) {
    return h(
      'button',
      {
        on: {
          click: () => {
            state.count++
          }
        }
      },
      `count is: ${state.count}`
    )
  }
}

export default {
  name: 'Home',
  components: { Demo }
}
</script>
