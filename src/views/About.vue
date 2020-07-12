<template>
  <div class="about">
    <h1>This is an about page</h1>

    <input type="text" v-model="loginForm.tel" />
    <input type="password" v-model="loginForm.password" />
    <button @click="login">登陆</button>
    <button @click="logout">退出</button>
    <hr />
    <button @click="getInfo">获取</button>
    <template v-if="user">
      <p>用户名：{{user.username}}</p>
      <p>用户名：{{user.tel}}</p>
    </template>
    <p v-else>暂无</p>

    <hr />
    <button @click="msg">MessageBox</button>
  </div>
</template>

<script>
import { MessageBox } from "element-ui";
// import { removeInfo, removeToken } from "@/utils/auth";
export default {
  data() {
    return {
      loginForm: {
        tel: "17888888888",
        password: "zxcvbnm"
      }
      // user: {}
    };
  },
  computed: {
    user() {
      return this.$store.state.user.userInfo;
    }
  },
  created() {
    this.getInfo();
  },
  methods: {
    login() {
      // console.log("login");
      this.$store.dispatch("user/login", this.loginForm).then(() => {
        this.getInfo();
        // this.$router.push(this.$route.query.redirect || "/"); // 跳转至前一页
      });
    },
    logout() {
      this.$store.dispatch("user/resetToken").then(() => {
        location.reload();
      });
    },
    msg() {
      MessageBox({
        title: "网络超时，是否刷新页面？",
        callback: action => {
          if (action == "confirm") location.reload();
        }
      });
    },
    getInfo() {
      this.$store.dispatch("user/getInfo");
    }
  }
};
</script>
