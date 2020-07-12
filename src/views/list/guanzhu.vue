<template>
  <div>
    <div class="tab">
      <span class="tab1 flex-center" :class="{'active':tab == 1}" @click="tab = 1">作者</span>
      <span class="tab2 flex-center" :class="{'active':tab == 2}" @click="tab = 2">分类</span>
    </div>
    <ul v-if="tab==1" class="list1">
      <li class="item" v-for="item in list1" :key="item.id">
        <div class="img_box"></div>
        <div class="info">
          <p class="name">{{item.name}}</p>
          <p class="p1">
            <span>作品</span>
            <span class="num">{{item.product}}</span>
            <span>点赞</span>
            <span class="num">{{item.click}}</span>
          </p>
        </div>
        <div class="btn_gz flex-center">取消关注</div>
      </li>
    </ul>
    <ul v-else class="list2">
      <li class="item" v-for="item in list2" :key="item.id">
        <div class="img_box"></div>
        <div class="title">{{item.name}}</div>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  data() {
    return {
      tab: 1,
      list1: [
        { id: 1, url: "", name: "Jennifer C", product: "123", click: "122" },
        { id: 2, url: "", name: "Jenifer C", product: "123", click: "122" },
        { id: 3, url: "", name: "Jenifer C", product: "123", click: "122" },
        { id: 4, url: "", name: "Jenifer C", product: "123", click: "122" },
        { id: 5, url: "", name: "Jenifer C", product: "123", click: "122" }
      ],
      list2: [
        { id: 1, url: "", name: "减肥" },
        { id: 2, url: "", name: "减肥" },
        { id: 3, url: "", name: "减肥" },
        { id: 4, url: "", name: "减肥" },
        { id: 5, url: "", name: "减肥" },
        { id: 6, url: "", name: "减肥" },
        { id: 7, url: "", name: "减肥" },
        { id: 8, url: "", name: "减肥" },
        { id: 9, url: "", name: "减肥" },
        { id: 10, url: "", name: "减肥" },
        { id: 11, url: "", name: "减肥" },
      ]
    };
  },
  watch: {
    tab() {
      console.log(this.tab);
    }
  }
};
</script>

<style lang="scss" scoped>
.flex-center {
  display: inline-flex;
  justify-content: center;
  align-items: center;
}
.tab {
  width: 134px;
  height: 30px;
  display: flex;
  align-items: center;
  font-size: 12px;
  .tab1,
  .tab2 {
    border: 1px solid #dbdcdc;
    color: #717071;
    width: 50%;
    height: 100%;
    cursor: pointer;
  }
  .tab1 {
    border-top-left-radius: 30px;
    border-bottom-left-radius: 30px;
    border-right: none;
  }
  .tab2 {
    border-top-right-radius: 30px;
    border-bottom-right-radius: 30px;
    border-left: none;
  }
  .active {
    background: #1d2087;
    color: #fff;
    border: none;
  }
}

.list1 {
  display: grid;
  grid-template-columns: 500px 500px;
  gap: 30px 50px;
  // grid-template-columns: 1fr 1fr;
  .item {
    display: flex;
    align-items: center;
    padding: 5px 20px;
    margin-top: 20px;
    border: 1px solid #000;
    .img_box {
      width: 60px;
      height: 60px;
      background: #c8c9c9;
      border-radius: 50%;
      margin-right: 10px;
    }
    .info {
      text-align: left;
    }
    .name {
      font-size: 16px;
      line-height: 20px;
      color: #717071;
    }
    .p1 {
      color: #c8c9ca;
      font-size: 12px;
      line-height: 16px;
      .num {
        color: #717071;
        margin-left: 6px;
        margin-right: 14x;
      }
    }
    .btn_gz {
      margin-left: auto;
      width: 90px;
      height: 30px;
      border: 2px solid #1d2087;
      color: #1d2087;
      border-radius: 30px;
      cursor: pointer;
    }
  }
}
.list2 {
  display: grid;
  grid-template-columns: 1fr 1fr 1fr 1fr 1fr 1fr;
  .item {
    width: 134px;
    margin: 20px 0;
    .img_box {
      width: 100%;
      height: 100px;
      background: #ccc;
    }
    .title{
      margin-top: 8px;
      padding-left: 5px;
      color: #3E3A39;
      font-size: 12px;
    }
  }
}
</style>