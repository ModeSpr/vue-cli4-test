<template>
  <swiper v-model="selected" autoplay>
    <swiperItem name="box1">
      <div class="content" style="background:red">页面1</div>
    </swiperItem>
    <swiperItem name="box2">
      <div class="content" style="background:green">页面2</div>
    </swiperItem>
    <swiperItem name="box3">
      <div class="content" style="background:yellow">页面3</div>
    </swiperItem>
  </swiper>
</template>
<script>
import swiperItem from "./swiperItem";
import swiper from "./swiper";
export default {
  data: () => {
    return { selected: "box3" };
  },
  components: {
    swiper,
    swiperItem
  },
  mounted() {
  }
};
</script>
<style lang="scss">
.content {
  width: 300px;
  height: 300px;
  text-align: center;
  margin: auto;
}
</style>