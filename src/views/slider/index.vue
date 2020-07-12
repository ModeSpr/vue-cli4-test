<template>
  <div class="slider">
    <div
      class="slider-image"
      :class="{active:activeIndex==item.id}"
      v-for="item in list"
      :key="item.id"
    >
      <img :src="item.url" alt />
    </div>
    <!-- banner-point -->
    <div class="slider-point">
      <span
        class="point"
        v-for="item in list"
        :key="item.id"
        @click="changeIndex(item.id)"
      >{{item.id}}</span>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      activeIndex: 1,
      autoplay: true,
      list: [
        {
          id: 1,
          url: "https://pic.qiantucdn.com/images/banner/5f07cd71b3074.jpg"
        },
        {
          id: 2,
          url: "https://pic.qiantucdn.com/images/banner/5f051f98033d0.jpg"
        },
        {
          id: 3,
          url: "https://pic.qiantucdn.com/images/banner/5efe8efcaae3d.png"
        }
      ]
    };
  },
  mounted() {
    this.autoShow();
  },
  beforeDestroy() {
    clearInterval(this.timer);
    this.timer = null;
    console.log(this.timer);
  },
  methods: {
    changeIndex(i) {
      this.activeIndex = i;
    },
    autoShow() {
      if (this.autoplay) {
        this.timer = setInterval(() => {
          if (this.activeIndex === this.list.length) {
            this.activeIndex = 1;
          } else this.activeIndex++;
          // console.log(this.activeIndex );
        }, 5000);
      }
    }
  }
};
</script>

<style lang="scss" scoped>
img {
  width: 100%;
}
.slider {
  width: 100%;
  height: 222px;
  position: relative;
  .slider-image {
    width: 100%;
    height: 100%;
    position: absolute;
    top: 0;
    left: 0;
    opacity: 0;
    transition: 0.6s cubic-bezier(0.43, 0.24, 0.45, 0.74) all;
  }
  .active {
    opacity: 1;
    z-index: 9;
  }
  .slider-point {
    width: 50%;
    height: 32px;
    position: absolute;
    bottom: 10px;
    left: 50%;
    z-index: 10;
    transform: translateX(-50%);
    // background-color: rgba(237, 233, 224, 0.4);
    // background-image: linear-gradient(-90deg,transparent, rgba(237, 233, 224, 0.4), transparent);
    background: linear-gradient(
      270deg,
      rgba(0, 0, 0, 0) 0,
      rgba(0, 0, 0, 0.24) 28%,
      rgba(0, 0, 0, 0.14) 77%,
      rgba(0, 0, 0, 0) 100%
    );
    display: flex;
    align-items: center;
    justify-content: center;
    .point {
      width: 150px;
      font-size: 16px;
      line-height: 32px;
      text-align: center;
      color: rgba(255, 255, 255, 0.6);
      cursor: pointer;
      margin: 0 10px;
      &:hover {
        color: #fff;
      }
    }
  }
}
</style>