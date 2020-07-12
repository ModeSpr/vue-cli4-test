<template>
  <div id="list">
    <div id="nav">
      <li @click="changeView('guanzhu')">我的关注</li>
      <li @click="changeView('dingdan')">
        <span>dingdan</span>
        <!-- 下弹菜单 -->
        <div class="drop-box">adasdfs</div>
      </li>
      <li @click="changeView('slider')">slider</li>
      <li @click="changeView('swiper')">swiper</li>
      <li @click="changeView('navList')">navList</li>
    </div>
    <div class="view">
      <component :is="currentView"></component>
    </div>
    <div class="triangle"></div>
  </div>
</template>
<script>
import guanzhu from "@/views/list/guanzhu";
import dingdan from "@/views/list/dingdan";
import slider from "@/views/slider";
import swiper from "@/views/swiper";
import navList from "@/views/list/navList";
export default {
  components: { guanzhu, dingdan, slider, swiper, navList },
  data() {
    return {
      currentView: "guanzhu"
    };
  },
  methods: {
    changeView(a) {
      this.currentView = a;
    }
  }
};
</script>

<style lang="scss" scoped>
.view {
  margin: 0 auto;
  width: 1100px;
  border: 1px solid #ccc;
  min-height: 300px;
  margin-bottom: 40px;
}
#nav {
  padding: 10px;
  width: 50%;
  margin: auto;
  display: flex;
  align-items: center;
  height: 44px;

  li {
    margin: 0 10px;
    cursor: pointer;
    position: relative;
    height: 44px;
    line-height: 44px;
    &:hover {
      color: #00be6e;
      &::before,
      .drop-box {
        display: block;
      }
    }
    &::before {
      display: none;
      content: "";
      height: 2px;
      position: absolute;
      background: #00be6e;
      background-color: rgb(0, 190, 110);
      left: 0;
      right: 0;
      bottom: 0;
      transition: all 0.2s ease;
    }
    .drop-box {
      display: none;
      position: absolute;
      top: 60px;
      left: 0px;
      z-index: 100;
      border-radius: 8px;
      width: 200px;
      height: 100px;
      background: red;
      box-shadow: 0 0 8px 2px rgba(191, 191, 191, 0.42);
      padding: 10px;
      box-sizing: border-box;
      &::before {
        content: "";
        position: absolute;
        // z-index: 99;
        top: -7px;
        left: 10px;
        width: 0;
        height: 0;
        border-top: 15px solid red;
        border-left: 15px solid transparent;
        // border-top-right-radius: 4px;
        transform: rotate(-45deg);
      }
    }
  }
}

// 圆角
.triangle {
  margin: auto;
  position: relative;
  background-color: orange;
  text-align: left;
}
.triangle:before,
.triangle:after {
  content: "";
  position: absolute;
  background-color: inherit;
}
.triangle,
.triangle:before,
.triangle:after {
  width: 100px;
  height: 100px;
  border-top-right-radius: 30%;
}

.triangle {
  transform: rotate(-60deg) skewX(-30deg) scale(1, 0.866);
}
.triangle:before {
  transform: rotate(-135deg) skewX(-45deg) scale(1.414, 0.707)
    translate(0, -50%);
}
.triangle:after {
  transform: rotate(135deg) skewY(-45deg) scale(0.707, 1.414) translate(50%);
}
</style>
