<template>
  <div id="select">
    <h2>选择</h2>
    <el-radio-group v-model="radio">
      <el-radio :label="3">备选项</el-radio>
      <el-radio :label="6">备选项</el-radio>
      <el-radio :label="9">备选项</el-radio>
      <el-radio :label="input" ref="other" :aria-checked="ck">
        <span>其他</span>
      </el-radio>
    </el-radio-group>
      <el-input v-model="input" placeholder="请输入内容" @input="se1" id="in"></el-input>

    <div>
      <label>
        <input type="radio" name="a" id value="1" v-model="aa" />1
      </label>
      <label>
        <input type="radio" name="a" id value="2" v-model="aa" />2
      </label>
      <label>
        <input type="radio" name="a" id :value="bb" v-model="aa"  ref="other2" />other
        <input type="text" name="a" v-model="bb" @input="se" />
      </label>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      radio: "",
      input: "",
      ck: false,
      aa: "",
      bb: "",
      ck2: false
    };
  },
  methods: {
    se1(){
      // this.$refs.other.attrs('aria-checked', true);
      this.ck = true;
    },
    se() {
      // this.$refs.other.attr('checked', true);
      // this.ck = true;
      console.log(this.$refs.other);
      this.$refs.other2.checked = true
      this.aa = this.bb
    }
  }
};
</script>

<style lang="scss">
</style>
