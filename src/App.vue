<template>
  <div id="app">
    <div id="nav">
      <router-link to="/">Home</router-link> |
      <router-link to="/rem">Rem</router-link>
    </div>
    <router-view />
  </div>
</template>

<script>
export default {
  name: 'app',
  mounted() {
    let version = process.env.BUILD_VERSION
    console.log('版本(BUILD_VERSION)：', new Date(version))
  }
}
</script>

<style lang="less">
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

#nav {
  padding: 10px;
  border-bottom: 1px solid chartreuse;

  a {
    font-weight: bold;
    color: #2c3e50;

    &.router-link-exact-active {
      color: #42b983;
    }
  }
}
</style>
