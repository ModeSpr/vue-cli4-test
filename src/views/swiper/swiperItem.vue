<template>
  <transition>
    <div class="swiper-item" v-if="isShow">
      <slot></slot>
    </div>
  </transition>
</template>

<script>
export default {
  props: {
    name: {
      type: String,
      required: true
    }
  },
  data() {
    return { selected: "" };
  },
  mounted() {},
  computed: {
    isShow() {
      return this.name === this.selected;
    }
  }
};
</script>
<style lang="scss">
.v-enter-active,
.v-leave-active {
  transition: all 1s linear;
  position: absolute;
}

.v-leave-to {
  transform: translate(-100%);
}

.v-enter {
  transform: translate(100%);
}
</style>