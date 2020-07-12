<template>
  <div class="notice">
    <ul class="list">
    <h2 class="h2">消息中心</h2>
      <li class="item" v-for="item in list" :key="item.id">
        <div class="flex-line">
          <div class="icon"></div>
          <p class="p1">{{item.txt}}</p>
          <p class="ellipsis"></p>
        </div>
        <div class="time">{{item.time}}</div>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
data(){
return {
  list:[
    {id:1,txt:'是自己没回复过圣诞节功夫啊一股撒饭噶静安寺符合健康',time:'2020 7 12 16:54'},
    {id:2,txt:'是自己没回复过圣诞节功夫啊一股撒饭噶静安寺符合健康',time:'2020 7 12 16:54'},
    {id:3,txt:'是自己没回复过圣诞节功夫啊一股撒饭噶静安寺符合健康',time:'2020 7 12 16:54'},
  ]
}

}
}
</script>

<style lang="scss">
.flex-line{
  display: flex;
  align-items: center;
}
.h2{
  color: #717071;
  font-size: 18px;
  font-weight: bold;
  text-align: left;
}
.ellipsis{
  flex:1;
  height: 0;
  border-bottom: 1px dashed #717071;
}
.list{
  width: 900px;
  margin: auto;
  .item{
    padding: 45px 0 30px;
    border-bottom: 1px solid #E5E6E6;
    .icon{
      width: 54px;
      height: 40px;
      background-color: #053893;
      margin-right: 23px;
    }
    .p1{
      color: #939393;
      font-size: 16px;
    }
    .time{
      color: #898989;
      margin-top: 20px;
      font-size: 12px;
      text-align: right;
    }
  }
}

</style>