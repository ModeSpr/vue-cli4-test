<template>
  <div class="swiper">
    <div class="viewport">
      <slot></slot>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    value: {
      type: String,
      default: ""
    },
    autoplay: {
      type: Boolean,
      default: true
    }
  },
  methods: {
    showChild() {
      this.currentName = this.value || this.$children[0].name;
      this.$children.forEach(vm => {
        vm.selected = this.currentName;
      });
    },
    autoShow() {
      if (this.autoplay) {
        this.timer = setInterval(() => {
          // console.log(123);
          let index = this.names.indexOf(this.currentName);
          let newIndex = ++index;
          if (newIndex === this.names.length) {
            newIndex = 0;
          }
          if (newIndex === -1) newIndex = this.names.length - 1;
          this.$emit("input", this.names[newIndex]);
        }, 2000);
      }
    }
  },
  watch: {
    value() {
      this.showChild();
    }
  },
  beforeDestroy() {
    clearInterval(this.timer);
    this.timer = null;
  },
  data() {
    return { currentName: "" };
  },
  mounted() {
    this.names = this.$children.map(vm => vm.name);
    this.showChild();
    this.autoShow();
  }
};
</script>
<style lang="scss">
.swiper {
  border: 5px solid black;
  width: 300px;
  height: 300px;
  margin: auto;
  text-align: center;
  overflow: hidden;
}

.viewport {
  position: relative;
}
</style>