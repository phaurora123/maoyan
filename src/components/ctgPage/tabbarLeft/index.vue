<template>
  <div class="tabLeft">
    <octivia-BScroll>
    <ul>
      <li v-for="(item,index) in list" 
      :key="index" 
      :class="(activeCtg==index)?'activeCtg':''"
      @tap="toggleCtg(item,index)">{{item.dd_name}}</li>
    </ul>
    </octivia-BScroll>
  </div>
</template>
<script>
export default {
  name: "ctgPage_tabLeft",
  methods: {
    toggleCtg(item,index) {
      this.activeCtg=index;
      this.$observer.$emit('TogPageid', item);
    }
  },
  data() {
    return {
      activeCtg:0,
      list: [
        { dd_name: "图书", pageid: "712231" },
        { dd_name: "童书", pageid: "712675" },
        { dd_name: "电子书", pageid: "712239" },
        { dd_name: "听书", pageid: "712636" },
        { dd_name: "网络文学", pageid: "712648" },
        { dd_name: "创意文具", pageid: "712655" },
        { dd_name: "二手旧书", pageid: "712652" },
        { dd_name: "女装", pageid: "713046" },
        { dd_name: "男装", pageid: "713109" },
        { dd_name: "男女鞋", pageid: "713178" },
        { dd_name: "童装童鞋", pageid: "712821" },
        { dd_name: "内衣配饰", pageid: "713213" },
        { dd_name: "母婴玩具", pageid: "712954" },
        { dd_name: "食品生鲜", pageid: "713260" },
        { dd_name: "美妆个护", pageid: "713244" },
        { dd_name: "手机数码", pageid: "713343" },
        { dd_name: "电脑办公", pageid: "713359" },
        { dd_name: "家用电器", pageid: "713362" },
        { dd_name: "运动户外", pageid: "713189" },
        { dd_name: "珠宝饰品", pageid: "713233" },
        { dd_name: "箱包皮具", pageid: "713209" },
        { dd_name: "当当优课", pageid: "833948" },
        { dd_name: "当当优品", pageid: "713466" },
        { dd_name: "家居家纺", pageid: "713319" },
        { dd_name: "厨房用品", pageid: "713338" },
        { dd_name: "营养保健", pageid: "713340" },
        { dd_name: "手表眼镜", pageid: "713222" },
        { dd_name: "汽车用品", pageid: "713464" },
        { dd_name: "家具家装", pageid: "713463" },
        { dd_name: "当当礼品卡", pageid: "713467" },
        { dd_name: "猜您喜欢", pageid: "0" }
      ]
    };
  }
};
</script>
<style>
.tabLeft {
  width: 21.4%;
  position: absolute;
  top:0.44rem;
  bottom: 0.44rem;
  left: 0;
  background: white;
  margin: 0;
  overflow: auto;
  /* height: 100%; */
}
.tabLeft  ul {
  width: 100%;
  /* height: 100%; */
  
}
.tabLeft  ul > li {
  color: #3c3c3c;
  font-size: 0.14rem;
  height: 0.45rem;
  line-height: 0.45rem;
  text-align: center;
}
.tabLeft ul>.activeCtg{
  background: #eff4fa;
  color:#E53E30
}
</style>
