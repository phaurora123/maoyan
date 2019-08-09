<template>
  <div class="detailSectionContent">
    <v-touch
      class="ctgProduct"
      v-for="(item,index) in ctgList"
      :key="index"
      tag="div"
      @tap="goTodetailSingle(item)"
    >
      <div class="productLeft">
        <img :src="item.image_url" alt />
      </div>
      <div class="productRight">
        <div class="prtName">
          <p>{{item.name}}</p>
          <p>{{item.authorname}}</p>
        </div>
        <div class="prtLabel">
          <div
            v-for="(itemL,indexL) in item.product_tags"
            :key="indexL"
            :class="itemL.type==0?'prtSelf':'prtLimitTime'"
          >{{itemL.name}}</div>
        </div>
        <!-- 少一项 满几折 打几折 -->
        <div class="prtPrice">
          <i>
            <b class="prtPriceLeft">￥</b>
            <b class="prtPriceMiddle">{{parseInt(item.price)}}</b>
            <!-- <b class="prtPriceRight">{{item.price.replace(/\d*\./,'.')}}</b> -->
          </i>
          <i class="prtPriceOriginal">{{item.original_price}}</i>
          <i class="prtPriceDiscount">
            <span>{{(item.price/item.original_price*10).toFixed(1)}}</span>
            折
          </i>
          <br />
          <i class="prtPriceEbook" v-if="item.has_ebook">电子书版 ￥{{item.ebook_dd_price}}</i>
        </div>
        <div class="prtComment">
          {{item.high_common_rate}}%
          好评(
          <span>{{item.total_review_count}}</span>
          人)
        </div>
      </div>
    </v-touch>
   
  </div>
</template>
<script>
import { mapState,mapActions } from "vuex";
export default {
  name: "detailSectionContent",
  created(){
    console.log(this.ctgList)
  },
  computed: {
    ...mapState({
      ctgList: state => state.BooksDetail.ctgList,
    })
    
  },
  methods: {
    goTodetailSingle(item) {
      this.sendToCart(item);
      console.log(item);
      // 设置跳进了购物车
      this.$router.push('/cart');
    },
    ...mapActions({
      sendToCart:'cart/sendToCartActions'
    })

  }
};
</script>
<style>
.detailSectionContent {
  width: 100%;
  font-size: 0.12rem;
  overflow: auto;
}
.ctgProduct {
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  height: 1.48rem;
  border-bottom: 1px solid #ccc;
}
.ctgProduct .productLeft,
.ctgProduct .productLeft > img {
  width: 1.25rem;
  height: 1.25rem;
}
.productRight {
  width: 2.44rem;
}
.productRight .prtName > p:first-child {
  padding-right: 0.05rem;
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 2;
  overflow: hidden;
  text-overflow: ellipsis;
  word-break: break-all;
  height: 0.38rem;
  line-height: 0.19rem;
  color: #444;
  font-size: 0.144rem;
}

.productRight .prtName > p:last-child {
  width: 100%;
  height: 0.168rem;
  line-height: 0.168rem;
  color: #999;
  font-size: 0.132rem;
  overflow: hidden;
  text-overflow: ellipsis;
}

.productRight .prtLabel .prtSelf {
  display: inline-block;
  /* width: 0.54rem; */
  border: 1px solid #f2303c;
  padding: 0.02rem;
  padding-top: 0.01rem;
  margin-top: 0.05rem;
  margin-right: 0.05rem;
  font-size: 0.12rem;
  color: #f2303c;
  border-radius: 0.02rem;
}
.productRight .prtLabel .prtLimitTime {
  display: inline-block;
  box-sizing: border-box;
  background: #f2303c;
  color: #ffffff;
  border: 1px solid #f2303c;
  margin: 0.02rem;
  padding: 0.01rem 0.02rem 0;
}

.prtPrice > i:first-child {
  color: #ff463c;
  font-size: 0.144rem;
}

.prtPriceMiddle {
  font-size: 0.168rem;
}

.prtPriceOriginal,
.prtPriceDiscount {
  color: #a1a1a1;
  font-size: 0.132rem;
  padding-left: 0.1rem;
}
.prtPriceOriginal {
  text-decoration: line-through;
}
.prtPriceEbook {
  color: #ff6d34;
  font-size: 0.12rem;
  display: block;
  text-indent: 0.15rem;
  background: url("data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAA4AAAAQCAMAAAARSr4IAAAAOVBMVEUAAAD/bTT/bTT/bTT/bTT/bTT/bTT/bTT/bTT/bTT/bTT/bTT/bTT/bTT/bTT/bTT/bTT/bTT/bTQiJNh8AAAAEnRSTlMAwr0Ts41NNCv188zHqqREPBbHig+HAAAARklEQVQI17XISxKAIAwE0UkiiH+d+x/WgsIIB6B3r2FKTw3CJgG7MlEbQksNn7DySB/DwtxZ+Ofc4jw59wgAZUDkQu1WeQGrtwmin5KXFAAAAABJRU5ErkJggg==")
    left no-repeat;
  background-size: 0.08rem;
  margin: 0.02rem 0;
}
.prtComment {
  color: #999;
  font-size: 0.132rem;
  line-height: 0.16rem;
}

</style>
