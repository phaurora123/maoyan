<template>
  <div class="detailSectionSelect">
    <ul>
      <v-touch
        :class="sortindex==index?'activeSort':''"
        v-for="(item,index) in sort_title"
        :key="index"
        tag="li"
        @tap="clickSort(sort_type[index],index)"
      >
        {{item}}
        <del v-if="item=='价格'">
          <i :class="priceSort ? 'arrowUp activePriceUp ':'arrowUp'"></i>
          <i :class="!priceSort ? 'arrowDown activePriceDown':'arrowDown'"></i>
        </del>
      </v-touch>
    </ul>
  </div>
</template>
<script>
import { mapState, mapActions } from "vuex";
import { ctgDetail_api } from "api/ctgPage.js";
export default {
  name: "detailSectionSelect",
  data() {
    return {
      sort_title: ["默认", "销量", "价格", "好评", "出版时间"],
      sort_type: [
        "default_0",
        "sales_1",
        { 0: "price_0", 1: "price_1" },
        "score_1",
        "publishdate_0"
      ],
      priceSort: true,
      sortindex: 0
    };
  },
  computed: {
    ...mapState({
      ctgId: state => state.BooksDetail.ctgId
    })
  },
  methods: {
    clickSort(sortItem, index) {
      this.sortindex = index;
      if (sortItem.constructor === Object) {
        this.priceSort = !this.priceSort;
        if (this.priceSort) {
          sortItem = sortItem[1];
        } else {
          sortItem = sortItem[0];
        }
        console.log(sortItem);
      }

      ctgDetail_api(this.ctgId, sortItem).then(data => {
        this.getBooksDetail(data);
      });
      // let data=async()=>{
      //   await ctgDetail_api(this.ctgId,sortItem)
      //   this.getBooksDetail(data);
      //   console.log(data)
      // }
      console.log(sortItem);
    },
    ...mapActions({
      getBooksDetail: "BooksDetail/getBooksDetailActions"
    })
  }
};
</script>
<style>
.detailSectionSelect {
  clear: both;
  position: relative;
  z-index: 1;
  width: 100%;
  height: 0.44rem;
}
.detailSectionSelect .activeSort {
  color: red;
}

.detailSectionSelect > ul {
  border-bottom: 1px solid #ccc;
  border-top: 1px solid #ccc;
  display: flex;
  justify-content: space-between;
  padding: 0 0.15rem;
  /* height:0.44rem */
}
.detailSectionSelect ul li {
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  height: 0.44rem;
  font-size: 0.144rem;
}

.detailSectionSelect .arrowUp {
  margin-left: 0.05rem;
  position: absolute;
  top: 38%;
  border-bottom: 0.04rem solid #777f86;
  border-left: 0.04rem solid transparent;
  border-right: 0.04rem solid transparent;
}
.detailSectionSelect .arrowDown {
  margin-left: 0.05rem;
  position: absolute;
  bottom: 38%;
  border-top: 0.04rem solid #777f86;
  border-left: 0.04rem solid transparent;
  border-right: 0.04rem solid transparent;
}
.detailSectionSelect .activePriceUp {
  border-bottom: 0.04rem solid #e23a3a;
  border-left: 0.04rem solid transparent;
  border-right: 0.04rem solid transparent;
}

.detailSectionSelect .activePriceDown {
  border-top: 0.04rem solid #e23a3a;
  border-left: 0.04rem solid transparent;
  border-right: 0.04rem solid transparent;
}
</style>
