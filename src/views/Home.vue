<template>
  <div class="home">
    <img alt="Vue logo" src="../assets/logo.png">
    <p>用户名：{{user.username}}</p>
    <p>用户名：{{user.tel}}</p>
  </div>
</template>

<script>

export default {
  name: 'Home',
  components: {
    // HelloWorld
  },
  data() {
    return {
      user:{}
    };
  },
  created() {
    // console.log('process.env.BASE_URL',process.env.BASE_URL);
    this.getInfo()
  },
  methods: {
    getInfo(){
      this.$store.dispatch("user/getInfo").then(data => {
        this.user =data;
      });
    }
  }
}
</script>
