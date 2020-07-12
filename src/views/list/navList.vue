<template>
  <div>
    <ul class="nav-list">
      <li class="nav-item">综合排序</li>
      <li class="nav-item">
        <el-popover placement="bottom-start" trigger="hover">
          <span slot="reference" class="p0">品牌种类</span>
          <p class="p1">
            超值精品每日更新
            <span class="small">（今日更新256个作品）</span>
          </p>
          <ul class="grid4 list">
            <li
              class="item"
              v-for="item in cateList"
              :key="item.id"
              @click="toSearch(item.id)"
            >{{item.name}}</li>
          </ul>
        </el-popover>
      </li>
      <li class="nav-item">
        <el-popover placement="bottom-start" trigger="hover">
          <span slot="reference" class="p0">风格偏好</span>
          <ul class="grid4 list">
            <li
              class="item"
              v-for="item in labelList"
              :key="item.id"
              @click="toSearch(item.id)"
            >{{item.name}}</li>
          </ul>
        </el-popover>
      </li>
      <li class="nav-item">
        <el-popover placement="bottom-start" trigger="hover">
          <span slot="reference" class="p0">价格排序</span>
          <li>升序</li>
          <li>降序</li>
        </el-popover>
      </li>
    </ul>
    <ul class="grid4 list">
      <label :class="{check:item.checked}" v-for="item in labelList" :key="item.id">
        <input type="checkbox" name="cate" :value="item.id" v-model="labels" />
        {{item.name}}
      </label>
    </ul>
  </div>
</template>

<script>
import axios from "axios";
export default {
  data() {
    return {
      labels: [],
      cateList: [],
      labelList: []
    };
  },
  watch: {
    labels() {
      this.labelList.map(ele => {
        if (this.labels.includes(ele.id)) return (ele.checked = 1);
        else return (ele.checked = 0);
      });
    }
  },
  created() {
    this.init();
  },
  methods: {
    init() {
      let p1 = axios("http://luckypacking.misass.com/api/product/cate?cid=1");
      let p2 = axios("http://luckypacking.misass.com/api/product/label");
      Promise.all([p1, p2])
        .then(res => {
          // console.log(res);
          this.cateList = res[0].data.data;
          this.labelList = res[1].data.data;
        })
        .catch(err => {
          console.log(err);
        });
    },
    toSearch(id) {
      console.log("搜索id：", id);
    }
  }
};
</script>

<style lang="scss" scoped>
.nav-list {
  min-width: 1000px;
  margin: auto;
  display: flex;
  align-items: center;
  justify-content: center;
  height: 60px;
  font-size: 16px;
  .nav-item {
    height: 100%;
    margin: 0 20px;
    // border-bottom: 1px solid #D3C9B3;
    display: flex;
    align-items: center;
    cursor: pointer;
    position: relative;
    &:hover {
      color: #00be6e;
      &::before {
        display: block;
      }
    }
    &::before {
      display: none;
      content: "";
      height: 2px;
      position: absolute;
      background: #d3c9b3;
      left: 0;
      right: 0;
      bottom: 0;
      transition: all 0.2s ease;
    }
    .p0 {
      display: flex;
      align-items: center;
      height: 60px;
    }
  }
}
.check {
  color: red;
  border: 1px solid red;
  border-radius: 8px;
}
input[type="checkbox"] {
  display: none;
}
.grid4 {
  display: grid;
  grid-template-columns: 1fr 1fr 1fr 1fr;
  gap: 10px 30px;
}
.el-popover {
  .list {
    margin-top: 20px;
    font-size: 12px;
    counter-reset: #3e3a39;
    .item {
      cursor: pointer;
      &:hover {
        color: #00be6e;
      }
    }
  }
  .p1 {
    font-size: 14px;
    color: #504c4c;
    font-weight: bold;
  }
  .small {
    font-size: 12px;
    color: #8a8a8a;
  }
}
</style>