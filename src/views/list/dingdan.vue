<template>
  <div>
    <p>订单</p>
    <ul class="list">
      <li class="item">
        <div class="img_box"></div>
        <div class="con">
          <div class="col-1">
            <h4>标题</h4>
          </div>
        </div>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  mounted() {
    // console.log(this.timer);
  }
};
</script>

<style lang="scss" scoped>
.list {
  padding: 20px 0;
  .item {
    display: flex;
  }
}
</style>