<template>
  <div class="rem">
    <!-- 行内样式 px 不会转换 -->
    <h1 style="font-size: 12px;">This is an about page</h1>
    <van-button class="rem-button" type="primary" @click="toast">Toast</van-button>
    <van-button class="rem-button" type="primary" @click="dialog">Dialog</van-button>
    <div class="box"></div>
  </div>
</template>

<script>
export default {
  methods: {
    toast() {
      this.$toast.allowMultiple(); // 允许同时多个toast
      this.$toast('第一个 Toast');
      this.$toast({
        message: '第二个 Toast',
        icon: 'like-o'
      });
    },
    dialog() {
      this.$dialog.confirm({
        title: '标题',
        message: '弹窗内容'
      });
    }
  }
};
</script>

<style lang="less" scoped>
.rem {
  .box {
    // px 会转换为 rem 单位
    // Px, pX, PX 不会转换
    width: 60px;
    height: 60px;
    background: chartreuse;
    margin: 20px auto;
    font-size: 12px;
  }
  .rem-button {
    margin-right: 10px;
  }
}
</style>
