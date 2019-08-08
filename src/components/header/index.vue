<template>
  <div class="headerSearch">
    <v-touch class="searchLeft" @tap="back" tag="div"></v-touch>
    <input type="text" placeholder="搜索商品/店铺/种类" v-model="userKeyword" />
    <v-touch v-if="!menuOrSelect" class="searchRight" @tap="clickMenu" tag="div"></v-touch>
    <v-touch v-if="menuOrSelect" class="searchRightFilter" @tap="clickToSelect" tag="div">筛选</v-touch>
    <ul v-if='show'>
      <v-touch class="searchList" 
      v-for="(item,index) in searchResult" 
      :key="index"
      tag='li'
      @tap='show=!show'>
        <span class="searchResultVal">{{item.key}}</span>
        <span class="searchResultNum">约{{item.count}}个结果</span>
      </v-touch>
    </ul>
  </div>
</template>

<script>
import { search_api, filter_api } from "api/ctgPage.js";
import { mapState, mapActions } from "vuex";

export default {
  name: "Header",
  data() {
    return {
      show:1,
      topMenu: false,
      userKeyword: "",
      ids: 0,
      searchResult: [],
      menuOrSelect: this.$route.path.includes("dd_category/cid")
    };
  },
  computed: {
    ...mapState({
      cid: state => state.BooksDetail.ctgId
    })
  },

  watch: {
    userKeyword(newVal) {
      clearTimeout(this.ids);
      this.ids = setTimeout(async () => {
        console.log(newVal);
        let result = await search_api(newVal);
        this.searchResult = result.word;
        console.log(this.searchResult);
        
      }, 500);
    }
  },
  methods: {
    clickMenu() {
      this.topMenu = !this.topMenu;
    },
    back() {
      this.$router.back();
    },
    ...mapActions({
      fliterMsgActions: "BooksDetail/fliterMsgActions"
    }),
    clickToSelect() {
      this.$router.push("/filter");
      console.log(this.cid)
      filter_api(this.cid).then((data)=>{
        console.log(data,"筛选响应")
        this.fliterMsgActions(data)
      })
      // async()=>{
      //     let result=await filter_api(this.cid)
      //     console.log(result,111)
      //     this.fliterMsgActions(result)
      // }
    }
  }
};
</script>

<style>
.headerSearch {
  width: 100%;
  height: 0.44rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
  position: relative;
  top: 0px;
  background: #fff;
}
.headerSearch .searchRight,
.searchRightFilter,
.searchLeft {
  width: 0.4rem;
  height: 0.44rem;
}
.headerSearch .searchRightFilter {
  font-size: 0.144rem;
  line-height: 0.44rem;
}

.headerSearch > .searchRight {
  background: url("http://search.m.dangdang.com/images/menu.png") no-repeat
    center;
  background-size: 60%;
}
.headerSearch > .searchLeft {
  background: url("http://search.m.dangdang.com/images/arrow_left.png")
    no-repeat center;
  background-size: 25%;
}
.headerSearch > input {
  display: block;
  width: 2.85rem;
  height: 0.3rem;
  color: #000;
  /* background: #e8ecf0; */
  background: url("http://search.m.dangdang.com/images/v4.5ico_43.png") #e8ecf0
    no-repeat 0.1rem;
  background-size: 6%;
  border-radius: 0.4rem;
  padding-left: 0.5rem;
  border: none;
  font-size: 0.14rem;
  outline: none;
}
.headerSearch ul {
  position: absolute;
  top: 0.44rem;
  z-index: 200;
  width: 100%;
  background: #fff;
}
.headerSearch .searchList {
  font-size: 0.14rem;
  width: 100%;
  height: 0.45rem;
  padding: 0.1rem;
  border-bottom: 1px solid #ccc;
  display: flex;
  justify-content: space-between;
}
</style>
