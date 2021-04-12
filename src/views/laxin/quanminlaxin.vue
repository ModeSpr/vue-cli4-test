<template>
  <div style="width:100vw;height:100vh;position:relative;">
    <div class="banner">
      <img src="@/assets/images/beijing_1.png" alt />
      <!-- <button class="btn" @click="alert1">
        分享邀请海报
        <span class="right">></span>
      </button>-->
      <button class="btn" @click="downloadclick">
        去注册下载
        <span class="right">></span>
      </button>
      <div class="player">
        <video-player
          class="video-player vjs-custom-skin"
          ref="videoPlayer"
          :playsinline="true"
          style="object-fit:fill"
          :options="playerOptions"
          :x5-video-player-fullscreen="true"
          @pause="onPlayerPause($event)"
          @play="onPlayerPlay($event)"
          @fullscreenchange="onFullscreenChange($event)"
          @click="fullScreen"
        ></video-player>
      </div>
    </div>
  </div>
</template>

<script>
import { videoPlayer } from "vue-video-player";
export default {
  components: {
    videoPlayer
  },
  data() {
    return {
      playerOptions: {
        // playbackRates: [0.7, 1.0, 1.5, 2.0], //播放速度
        autoplay: false, //如果true,浏览器准备好时开始回放。
        muted: false, // 默认情况下将会消除任何音频。
        loop: false, // 导致视频一结束就重新开始。
        preload: "auto", // 建议浏览器在<video>加载元素后是否应该开始下载视频数据。auto浏览器选择最佳行为,立即开始加载视频（如果浏览器支持）
        language: "zh-CN",
        aspectRatio: "16:9", // 将播放器置于流畅模式，并在计算播放器的动态大小时使用该值。值应该代表一个比例 - 用冒号分隔的两个数字（例如"16:9"或"4:3"）
        fluid: true, // 当true时，Video.js player将拥有流体大小。换句话说，它将按比例缩放以适应其容器。
        sources: [
          {
            type: "video/mp4",
            src: "http://oss.wegood.shop/web/video/quanminlaxin.mp4"
          }
        ],
        poster: "http://oss.wegood.shop/web/video/cover/qmlximg.png",
        width: document.documentElement.clientWidth,
        notSupportedMessage: "此视频暂无法播放，请稍后再试", //允许覆盖Video.js无法播放媒体源时显示的默认信息。
        controlBar: {
          // timeDivider: true,
          // durationDisplay: true,
          // remainingTimeDisplay: false,
          fullscreenToggle: true //全屏按钮
        }
      }
    };
  },
  created() {
    var index;
    index = window.location.href.indexOf("?f"); /* 获取完整URL */
    // console.log(this.$route.query.f=="")
    if (
      (this.$route.query.f == undefined ||
        this.$route.query.f == null ||
        this.$route.query.f == "") &&
      index > -1
    ) {
      const toast = Toast.loading({
        duration: 0, // 持续展示 toast
        forbidClick: true,
        message: "邀请码已失效"
      });

      let second = 180;
      const timer = setInterval(() => {
        second--;
        if (second) {
          toast.message = `邀请码已失效${second}`;
        } else {
          clearInterval(timer);
          // 手动清除 Toast
          Toast.clear();
        }
      }, 1000);
    }
  },
  methods: {
    /**
     * 视频方法
     */
    fullScreen() {
      const player = this.$refs.videoPlayer.player;
      player.requestFullscreen(); //调用全屏api方法
      player.isFullscreen(true);
      player.play();
    },
    onPlayerPlay(player) {
      player.play();
      player.requestFullscreen(); //调用全屏api方法
    },
    onPlayerPause(player) {
      // alert("pause");
    },
    /**
     * 分享邀请海报
     */
    // alert1() {
    //   try {
    //     if (JsCallAndroid != undefined) {
    //       JsCallAndroid.showPoster();
    //     }
    //   } catch (error) {
    //     console.log(error);
    //   }

    //   try {
    //     if (JsCallIOS != undefined) {
    //       JsCallIOS.showPoster();
    //     }
    //   } catch (error) {
    //     console.log(error);
    //   }

    //   try {
    //     window.webkit.messageHandlers.showPoster.postMessage(1);
    //   } catch (error) {
    //     console.log(error);
    //   }
    // },

    /**
     * 去注册下载页
     */
    downloadclick() {
      var index;
      index = window.location.href.indexOf("?f"); /* 获取完整URL */
      this.timer = setTimeout(() => {
        if (
          (this.$route.query.f != undefined ||
            this.$route.query.f != null ||
            this.$route.query.f != "") &&
          index > -1
        ) {
          location.href =
            "https://account.wegood.shop/?f=" + this.$route.query.f;
        } else {
          location.href = "https://account.wegood.shop";
        }
      }, 500);
    }
  },
  computed: {
    player() {
      return this.$refs.videoPlayer.player;
    }
  }
};
</script>

<style lang="less" scoped>
.right {
  float: right;
}
.btn {
  width: 100%;
  height: 1.5rem;
  background-image: linear-gradient(to right, #ff7113, #ff0033);
  font-size: 40px;
  color: #fff;
  border: 0px solid;
}
.vue {
  font-size: 50px;
}
.fanhui {
  width: 20px;
  height: 40px;
}
.shuaxin,
.fenxiang {
  width: 40px;
  height: 40px;
}
.fenxiang {
  margin-left: 40px;
}
.banner {
  background-color: #ffb581;
  img {
    width: 100%;
    height: 100%;
    display: block;
  }
}
footer {
  width: 750px;
  height: 88px;
  background: linear-gradient(
    90deg,
    rgba(255, 113, 19, 1),
    rgba(255, 0, 51, 1)
  );
  text-align: center;
  line-height: 88px;
  font-size: 32px;
  color: #fff;
  img {
    width: 14px;
    height: 27px;
    float: right;
    margin-top: 34px;
    margin-right: 28px;
  }
}
.video-js .vjs-big-play-button {
  width: 72px;
  height: 72px;
  border-radius: 100%;
  z-index: 100;
  background-color: #ffffff;
  border: solid 1px #979797;
}
.player{
  position: absolute;
  top: 12.23rem;
  left: 0.71rem;
  width: 72.5%;
}
</style>
